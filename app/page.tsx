import { ThemeButton } from "@/components/buttons/theme-button";
import Image from "next/image";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from "@tanstack/react-query";
import { readPasswords } from "@/server/actions";
import Passwords from "@/components/cmps/passwords";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default async function Home() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['passwords'],
    queryFn: readPasswords
  })

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Password Manager</h1>
            <ThemeButton />
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Your Passwords</h2>
          <Button
            variant="outline"
            size="sm"
            // onClick={() => {
            //   // TODO: Implement add password functionality

            // }}
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add Password
          </Button>
        </div>

        <div>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <Passwords />
          </HydrationBoundary>
        </div>

      </main>

      <footer className="border-t py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-6 flex-wrap items-center justify-center">
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="https://nextjs.org/icons/file.svg"
                alt="File icon"
                width={16}
                height={16}
              />
              Learn
            </a>
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="https://nextjs.org/icons/window.svg"
                alt="Window icon"
                width={16}
                height={16}
              />
              Examples
            </a>
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="https://nextjs.org/icons/globe.svg"
                alt="Globe icon"
                width={16}
                height={16}
              />
              Go to nextjs.org →
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
