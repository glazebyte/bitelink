import heroImg from "@/app/assets/Illustration1.png";
import benefitImg from "@/app/assets/Illustration2.png";
import Image from "next/image";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import LoginDialog from "@/components/login-dialog";
import { getProviders } from "next-auth/react";

export default async function Home() {
  const loginproviders = await getProviders();
  return (
    <>
      <Navbar />
      <div className="container p-8 mx-auto xl:px-0">
        <div className="container p-8 mx-auto xl:px-0 flex flex-wrap">
          <div className="flex items-center w-full lg:w-1/2">
            <div className="max-w-2xl mb-8">
              <h1 className="text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight dark:text-white">
                Create links that perform with our powerful URL Shortener
              </h1>
              <p className="py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl dark:text-gray-300">
                Spark instant connections with your audience using trimmed,
                trustworthy, and trackable links within the BiteLink Connections
                Platform.
              </p>

              <div className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
                <LoginDialog>
                  <button className="px-8 py-4 text-lg font-medium text-center text-white bg-indigo-600 rounded-md">
                    Get started for free
                  </button>
                </LoginDialog>
                {/* <a
                  href="https://web3templates.com/templates/nextly-landing-page-template-for-startups"
                  target="_blank"
                  rel="noopener"
                  className="px-8 py-4 text-lg font-medium text-center text-white bg-indigo-600 rounded-md "
                >
                  Get started for free
                </a> */}
                <a
                  href="https://github.com/web3templates/nextly-template/"
                  target="_blank"
                  rel="noopener"
                  className="flex items-center space-x-2 text-gray-500 dark:text-gray-400"
                >
                  <svg
                    role="img"
                    width="24"
                    height="24"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>GitHub</title>
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                  <span> View on Github</span>
                </a>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center w-full lg:w-1/2">
            <div className="">
              <Image
                src={heroImg}
                width="616"
                height="617"
                className={"object-cover"}
                alt="Hero Illustration"
                loading="eager"
                placeholder="blur"
              />
            </div>
          </div>
        </div>
        <div className="container p-8 mx-auto xl:px-0 flex w-full flex-col mt-4 items-center justify-center text-centers">
          <div className="text-sm font-bold tracking-wider text-indigo-600 uppercase">
            Nextly Benefits
          </div>
          <h2 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl dark:text-white">
            Why should you use BiteLink
          </h2>
          <p className="max-w-2xl py-4 text-lg text-center leading-normal text-gray-500 lg:text-xl xl:text-xl dark:text-gray-300">
            Nextly is a free landing page & marketing website template for
            startups and indie projects. Its built with Next.js & TailwindCSS.
            And its completely open-source.
          </p>
        </div>
        <div className="container p-8 mx-auto xl:px-0 flex flex-wrap mb-20 lg:gap-10 lg:flex-nowrap ">
          <div className="flex items-end justify-end w-full lg:w-1/2 ">
            <div>
              <Image
                src={benefitImg}
                width={521}
                height={521}
                alt="Benefits"
                className={"object-cover"}
                placeholder="blur"
              />
            </div>
          </div>
          <div className="flex flex-wrap items-center w-full lg:w-1/2 lg:pr-72">
            <div>
              <div className="flex flex-col w-full mt-4">
                <h3 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl dark:text-white">
                  Tailored links
                </h3>
                <p className="max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl dark:text-gray-300">
                  Build strong brand credibility by customizing your links with
                  our trusted link shortener.
                </p>
              </div>
              <div className="w-full mt-5">
                <div className="flex items-start mt-8 space-x-4">
                  <div className="flex items-center justify-center flex-shrink-0 mt-1 w-11 h-11 ">
                    <CheckBadgeIcon className="w-9 h-9 text-indigo-500" />
                  </div>
                  <div>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                      Activate brand recall effortlessly with custom links that
                      your audience recognizes in seconds.
                    </p>
                  </div>
                </div>
                <div className="flex items-start mt-8 space-x-3">
                  <div className="flex items-center justify-center flex-shrink-0 mt-1 w-11 h-11 ">
                    <CheckBadgeIcon className="w-9 h-9 text-indigo-500" />
                  </div>
                  <div>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                      Drive higher click-through rates and more engagement with
                      a custom domain that’s unique to your brand.
                    </p>
                  </div>
                </div>
                <div className="flex items-start mt-8 space-x-3">
                  <div className="flex items-center justify-center flex-shrink-0 mt-1 w-11 h-11 ">
                    <CheckBadgeIcon className="w-9 h-9 text-indigo-500" />
                  </div>
                  <div>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                      Attract more clicks with polished short links that inspire
                      confidence.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
