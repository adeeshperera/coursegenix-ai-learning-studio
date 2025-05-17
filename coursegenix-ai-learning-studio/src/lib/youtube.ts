import axios from "axios";
import { YoutubeTranscript } from "youtube-transcript";
import { strict_output } from "./gpt";

interface YouTubeVideo {
    id: { videoId: string };
    snippet: {
        title: string;
        description: string;
        channelTitle: string;
    };
    statistics?: VideoStatistics;
    score?: number;
}

interface VideoStatistics {
    viewCount: string;
    likeCount: string;
    dislikeCount?: string;
}

interface VideoStats {
    id: string;
    statistics: VideoStatistics;
}

export async function searchYoutube(searchQuery: string) {
    try {
        // First, search for videos
        searchQuery = encodeURIComponent(searchQuery);
        const searchResponse = await axios.get<{ items: YouTubeVideo[] }>(
            `https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API_KEY}&q=${searchQuery}&videoDuration=medium&videoEmbeddable=true&type=video&maxResults=5&part=snippet&relevanceLanguage=en&order=relevance`
        );

        if (!searchResponse.data?.items?.length) {
            console.log("No videos found");
            return null;
        }

        // Get video statistics for all found videos
        const videoIds = searchResponse.data.items.map(item => item.id.videoId).join(',');
        const statsResponse = await axios.get<{ items: VideoStats[] }>(
            `https://www.googleapis.com/youtube/v3/videos?key=${process.env.YOUTUBE_API_KEY}&id=${videoIds}&part=statistics,contentDetails`
        );

        if (!statsResponse.data?.items?.length) {
            return searchResponse.data.items[0].id.videoId;
        }

        // Combine search results with their statistics
        const videos = searchResponse.data.items.map((video: YouTubeVideo) => {
            const videoStats = statsResponse.data.items.find(
                (stat: VideoStats) => stat.id === video.id.videoId
            );
            return {
                ...video,
                statistics: videoStats?.statistics
            };
        });

        // Score and rank videos based on multiple factors
        const rankedVideos = videos
            .map((video: YouTubeVideo) => {
                const viewCount = parseInt(video.statistics?.viewCount || '0');
                const likeCount = parseInt(video.statistics?.likeCount || '0');
                
                // Calculate engagement ratio (likes per view)
                const engagementRatio = viewCount > 0 ? (likeCount / viewCount) : 0;
                
                // Calculate relevancy score based on title and description matching
                const decodedQuery = decodeURIComponent(searchQuery).toLowerCase();
                const titleMatchScore = video.snippet.title.toLowerCase().includes(decodedQuery) ? 1 : 0;
                const descMatchScore = video.snippet.description.toLowerCase().includes(decodedQuery) ? 0.5 : 0;
                
                // Calculate final score (weightage can be adjusted)
                const score = (
                    (Math.log10(viewCount + 1) * 0.4) + // View count (logarithmic scale)
                    (engagementRatio * 0.3) + // Engagement ratio
                    (titleMatchScore * 0.2) + // Title match
                    (descMatchScore * 0.1) // Description match
                );

                return {
                    ...video,
                    score
                };
            })
            .sort((a: YouTubeVideo, b: YouTubeVideo) => (b.score || 0) - (a.score || 0));

        // Return the highest-ranked video ID
        return rankedVideos[0].id.videoId;
    } catch (error) {
        console.error("YouTube API error:", error instanceof Error ? error.message : String(error));
        return null;
    }
}

export async function getTranscript(videoId: string) {
    try {
        const transcript_arr = await YoutubeTranscript.fetchTranscript(videoId, {
            lang: "en",
        });
        let transcript = "";
        for (const t of transcript_arr) {
            transcript += t.text + " ";
        }
        return transcript.replaceAll("\n", "");
    } catch (error) {
        console.error("Transcript fetch error:", error instanceof Error ? error.message : String(error));
        return "";
    }
}

interface Question {
    question: string;
    answer: string;
    option1: string;
    option2: string;
    option3: string;
}

export async function getQuestionsFromTranscript(
    transcript: string,
    course_title: string
): Promise<Question[]> {
    const rawQuestions = await strict_output(
        "You are a helpful AI that is able to generate MCQ (Multiple Choice Questions) questions and answers related to the topic, the length of each answer should not be more than 15 words",
        new Array(5).fill(
            `You are to generate a random hard mcq question about ${course_title} with context of the following transcript: ${transcript}`
        ),
        {
            question: "question",
            answer: "answer with max length of 15 words",
            option1: "option1 with max length of 15 words",
            option2: "option2 with max length of 15 words",
            option3: "option3 with max length of 15 words",
        }
    );
    
    // Validate and transform the raw output to ensure type safety
    if (!Array.isArray(rawQuestions)) {
        throw new Error('Expected array of questions from AI output');
    }
    
    return rawQuestions.map((q: unknown): Question => {
        if (
            typeof q === 'object' && 
            q !== null && 
            'question' in q &&
            'answer' in q &&
            'option1' in q &&
            'option2' in q &&
            'option3' in q
        ) {
            return {
                question: String(q.question),
                answer: String(q.answer),
                option1: String(q.option1),
                option2: String(q.option2),
                option3: String(q.option3)
            };
        }
        throw new Error('Invalid question format in AI output');
    });
}
