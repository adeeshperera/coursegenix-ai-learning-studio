import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
	basePath: "https://api.x.ai/v1",
});
const openai = new OpenAIApi(configuration);

interface OutputFormat {
	[key: string]: string | string[] | OutputFormat;
}

export async function strict_output(
	system_prompt: string,
	user_prompt: string | string[],
	output_format: OutputFormat,
	default_category: string = "",
	output_value_only: boolean = false,
	model: string = "grok-3-mini",
	temperature: number = 1,
	num_tries: number = 3,
	verbose: boolean = false
) {
	// if the user input is in a list, we also process the output as a list of json
	const list_input: boolean = Array.isArray(user_prompt);
	// if the output format contains dynamic elements of < or >, then add to the prompt to handle dynamic elements
	const dynamic_elements: boolean = /<.*?>/.test(JSON.stringify(output_format));
	// if the output format contains list elements of [ or ], then we add to the prompt to handle lists
	const list_output: boolean = /\[.*?\]/.test(JSON.stringify(output_format));

	// start off with no error message
	let error_msg: string = "";

	for (let i = 0; i < num_tries; i++) {
		let output_format_prompt: string = `\nYou are to output ${
			list_output && "an array of objects in"
		} the following in json format: ${JSON.stringify(
			output_format
		)}. \nDo not put quotation marks or escape character \\ in the output fields.`;

		if (list_output) {
			output_format_prompt += `\nIf output field is a list, classify output into the best element of the list.`;
		}

		// if output_format contains dynamic elements, process it accordingly
		if (dynamic_elements) {
			output_format_prompt += `\nAny text enclosed by < and > indicates you must generate content to replace it. Example input: Go to <location>, Example output: Go to the garden\nAny output key containing < and > indicates you must generate the key name to replace it. Example input: {'<location>': 'description of location'}, Example output: {school: a place for education}`;
		}

		// if input is in a list format, ask it to generate json in a list
		if (list_input) {
			output_format_prompt += `\nGenerate an array of json, one json for each input element.`;
		}

		// Use OpenAI to get a response
		const response = await openai.createChatCompletion({
			temperature: temperature,
			model: model,
			messages: [
				{
					role: "system",
					content: system_prompt + output_format_prompt + error_msg,
				},
				{ role: "user", content: user_prompt.toString() },
			],
		});

		let res: string =
			response.data.choices[0].message?.content?.replace(/'/g, '"') ?? "";

			// Ensure the response starts and ends with proper JSON syntax
			if (!res.trim().startsWith('{') && !res.trim().startsWith('[')) {
				res = `{"summary": ${JSON.stringify(res.trim())}}`;
			}
			
			// Clean up any potential invalid JSON characters
			res = res.replace(/\n/g, ' ')
				.replace(/\r/g, ' ')
				.replace(/\t/g, ' ')
				.replace(/\s+/g, ' ')
				.replace(/(\w)"(\w)/g, "$1'$2");

		if (verbose) {
			console.log(
				"System prompt:",
				system_prompt + output_format_prompt + error_msg
			);
			console.log("\nUser prompt:", user_prompt);
			console.log("\nGrok response:", res);
		}

		// try-catch block to ensure output format is adhered to
		try {
			const output: Record<string, unknown>[] = Array.isArray(JSON.parse(res)) 
				? JSON.parse(res) 
				: [JSON.parse(res)];

			if (list_input && !Array.isArray(output)) {
				throw new Error("Output format not in an array of json");
			}

			// check for each element in the output_list, the format is correctly adhered to
			for (let index = 0; index < output.length; index++) {
				for (const key in output_format) {
					// unable to ensure accuracy of dynamic output header, so skip it
					if (/<.*?>/.test(key)) {
						continue;
					}

					// if output field missing, raise an error
					if (!(key in output[index])) {
						throw new Error(`${key} not in json output`);
					}

					// check that one of the choices given for the list of words is an unknown
					if (Array.isArray(output_format[key])) {
						const choices = output_format[key] as string[];
						// ensure output is not a list
						if (Array.isArray(output[index][key])) {
							// Properly cast the array with type assertion before accessing elements
							const valueArray = output[index][key] as unknown[];
							output[index][key] = valueArray.length > 0 ? valueArray[0] : '';
						}
						// output the default category (if any) if grok is unable to identify the category
						if (!choices.includes(String(output[index][key])) && default_category) {
							output[index][key] = default_category;
						}
						// if the output is a description format, get only the label
						if (typeof output[index][key] === 'string' && (output[index][key] as string).includes(":")) {
							output[index][key] = (output[index][key] as string).split(":")[0];
						}
					}
				}

				// if we just want the values for the outputs
				if (output_value_only) {
					const values = Object.values(output[index]);
					// Type assertion to ensure we can assign the values to output[index]
					output[index] = values as unknown as Record<string, unknown>;
					// just output without the list if there is only one element
					if (values.length === 1) {
						output[index] = values[0] as unknown as Record<string, unknown>;
					}
				}
			}

			return list_input ? output : output[0];
		} catch (e) {
			error_msg = `\n\nResult: ${res}\n\nError message: ${e}`;
			console.log("An exception occurred:", e);
			console.log("Current invalid json format ", res);
		}
	}

	return [];
}
