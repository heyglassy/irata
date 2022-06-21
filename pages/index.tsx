import type { NextPage } from "next";
import Head from "next/head";
import create from "zustand";
import Pusher, { Channel } from "pusher-js";
import { useEffect } from "react";

type store = {
  init: () => void;
  channel?: Channel;
  pusher?: Pusher;
};

const useStore = create<store>((set) => ({
  init: () => {
    const pusher = new Pusher("dc3c112895a3d6903168", {
      cluster: "us3",
      channelAuthorization: { endpoint: "/api/pusher/auth", transport: "ajax" },
    });

    const channel = pusher.subscribe("private-my-channel");
    set(() => ({ channel: channel }));
  },
  channel: undefined,
  pusher: undefined,
}));

const Home: NextPage = () => {
  const { init, channel, pusher } = useStore((state) => state);

  useEffect(() => {
    init();

    channel?.bind("my-event", function (data) {
      alert(JSON.stringify(data));
    });

    return () => {
      pusher?.unsubscribe("private-my-channel");
    };
  }, []);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="flex justify-center items-center h-screen">
          <button
            onClick={() => {
              channel?.trigger("client-my-event", "Hi!");
            }}
            className="bg-black text-white w-24 h-12 rounded"
          >
            Trigger
          </button>
        </div>
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
