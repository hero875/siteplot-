import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md p-4">
        <SignUp
          appearance={{
            elements: {
              card: "bg-[#0b0c10] border border-white/5 shadow-2xl",
              headerTitle: "text-white font-outfit",
              headerSubtitle: "text-muted-foreground",
              socialButtonsBlockButton: "bg-white/5 border border-white/10 text-white hover:bg-white/10",
              formButtonPrimary: "bg-primary hover:bg-primary/90 text-white",
              formFieldLabel: "text-muted-foreground",
              formFieldInput: "bg-white/5 border-white/10 text-white",
              footerActionLink: "text-primary hover:text-primary/80",
            },
          }}
        />
      </div>
    </div>
  );
}
