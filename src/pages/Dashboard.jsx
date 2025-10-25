import React, { useEffect, useState } from "react";
import { getDashboard } from "../apis/api";

export default function Dashboard({ unique_name }) {
  const [message, setMessage] = useState("");
  const [summary, setSummary] = useState(null);

  //   summary: {
  //       unique_key: "",
  //       total: 0,
  //       success: 0,
  //       client_error: 0,
  //       server_error: 0,
  //       top_endpoint: "",
  //       top_ip: "",
  //       method_counts: {
  //         PUT: 0,
  //         GET: 0,
  //         DELETE: 0,
  //         POST: 0,
  //       },
  //     },

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    setTimeout(async () => {
      await fetchData();
    }, 20000);
  }

  async function fetchData() {
    try {
      const res = await getDashboard(unique_name);
      console.log(res);
      setMessage(res.message);
      setSummary(res.summary);
    } catch (err) {
      console.error(err);
      setMessage("Upload failed");
    }
  }
  return (
    <>
      {summary !== null ? (
        <>
          <section class="text-gray-600 body-font">
            <div class="container px-5 py-16 mx-auto">
              <div class="flex flex-wrap -m-4 text-center">
                <div class="p-4 md:w-1/4 sm:w-1/2 w-full">
                  <div class="border-2 border-gray-200 px-4 py-6 rounded-lg">
                    <h2 class="title-font font-medium text-3xl text-gray-900">
                      {summary.total || 0}
                    </h2>
                    <p class="leading-relaxed">Number of Rows</p>
                  </div>
                </div>
                <div class="p-4 md:w-1/4 sm:w-1/2 w-full">
                  <div class="border-2 border-gray-200 px-4 py-6 rounded-lg">
                    <h2 class="title-font font-medium text-3xl text-gray-900">
                      {summary.success || 0}
                    </h2>
                    <p class="leading-relaxed">Success</p>
                  </div>
                </div>
                <div class="p-4 md:w-1/4 sm:w-1/2 w-full">
                  <div class="border-2 border-gray-200 px-4 py-6 rounded-lg">
                    <h2 class="title-font font-medium text-3xl text-gray-900">
                      {summary.client_error || 0}
                    </h2>
                    <p class="leading-relaxed">Client Error</p>
                  </div>
                </div>
                <div class="p-4 md:w-1/4 sm:w-1/2 w-full">
                  <div class="border-2 border-gray-200 px-4 py-6 rounded-lg">
                    <h2 class="title-font font-medium text-3xl text-gray-900">
                      {summary.server_error || 0}
                    </h2>
                    <p class="leading-relaxed">Server Error</p>
                  </div>
                </div>
                <div class="p-4 md:w-1/4 sm:w-1/2 w-full">
                  <div class="border-2 border-gray-200 px-4 py-6 rounded-lg">
                    <h2 class="title-font font-medium text-3xl text-gray-900">
                      {summary.top_endpoint || 0}
                    </h2>
                    <p class="leading-relaxed">Top Endpoint</p>
                  </div>
                </div>
                <div class="p-4 md:w-1/4 sm:w-1/2 w-full">
                  <div class="border-2 border-gray-200 px-4 py-6 rounded-lg">
                    <h2 class="title-font font-medium text-3xl text-gray-900">
                      {summary.top_ip || 0}
                    </h2>
                    <p class="leading-relaxed">Top Ip</p>
                  </div>
                </div>
                {/* <div class="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div class="border-2 border-gray-200 px-4 py-6 rounded-lg">
                <p class="title-font font-medium text-gray-900">
                  POST - {summary.method_counts.POST || 0}
                </p>
                <p class="title-font font-medium text-gray-900">
                  PUT - {summary.method_counts.PUT || 0}
                </p>
                <p class="title-font font-medium text-gray-900">
                  GET - {summary.method_counts.GET || 0}
                </p>
                <p class="title-font font-medium text-gray-900">
                  DELETE - {summary.method_counts.DELETE || 0}
                </p>
              </div>
            </div> */}
              </div>
            </div>
          </section>

          <button
            onClick={fetchData}
            class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          >
            Refresh Dashboard
          </button>
        </>
      ) : (
        <div class="container px-5 py-16 mx-auto">
          <div role="status" class="max-w-sm animate-pulse">
            <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </>
  );
}
