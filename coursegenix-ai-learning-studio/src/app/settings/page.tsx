import SubscriptionButton from "@/components/SubscriptionButton";
import { checkSubscription } from "@/lib/subscription";
import { Separator } from "@/components/ui/separator";
import UserAvatar from "@/components/UserAvatar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Switch } from "@/components/ui/switch";

const SettingsPage = async () => {
  const isPro = await checkSubscription();
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="py-8 mx-auto max-w-4xl space-y-8">
      <section aria-labelledby="profile-heading">
        <h1 id="profile-heading" className="text-4xl font-bold mb-2">Profile Settings</h1>
        <div className="bg-card rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <UserAvatar user={session.user} className="h-20 w-20" />
            <div className="flex-1">
              <h2 className="text-2xl font-semibold">{session.user.name}</h2>
              <p className="text-muted-foreground">{session.user.email}</p>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section aria-labelledby="preferences-heading">
        <h2 id="preferences-heading" className="text-2xl font-semibold mb-4">Account Preferences</h2>
        <div className="bg-card rounded-lg p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Theme</h3>
              <p className="text-sm text-muted-foreground">Choose your preferred theme</p>
            </div>
            <ThemeToggle />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Email Notifications</h3>
              <p className="text-sm text-muted-foreground">Receive updates about your courses</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Available Credits</h3>
              <p className="text-sm text-muted-foreground">Credits for generating courses</p>
            </div>
            <span className="text-lg font-semibold">{session.user.credits} credits</span>
          </div>
        </div>
      </section>

      <Separator />

      <section aria-labelledby="subscription-heading">
        <h2 id="subscription-heading" className="text-2xl font-semibold mb-4">Subscription</h2>
        <div className="bg-card rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-medium mb-1">Current Plan</h3>
              {isPro ? (
                <p className="text-primary">Pro Subscription</p>
              ) : (
                <p className="text-muted-foreground">Free Plan</p>
              )}
            </div>
            <SubscriptionButton isPro={isPro} />
          </div>
          
          <div className="mt-6">
            <h4 className="font-medium mb-4">Plan Features</h4>
            <div className="grid gap-2">
              <div className="flex items-center gap-2 text-sm">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Unlimited course generation</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Advanced AI features</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Priority support</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SettingsPage;
