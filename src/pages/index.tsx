import { useEffect, useRef } from "react";
import { AiEditor } from "aieditor";
import "aieditor/dist/style.css";

export default function HomePage() {
  const divRef = useRef(null);
  const flowId = "237abe8e-44ff-4eb9-8ab4-e6196c99dac6";
  //Init AiEditor
  useEffect(() => {
    if (divRef.current) {
      const aiEditor = new AiEditor({
        element: divRef.current,
        placeholder: "点击输入内容...",
        content: "AiEditor 是一个面向 AI 的开源富文本编辑器。 ",
        ai: {
          models: {
            custom: {
              url:
                "/ngraphx/share/api/v1/graphx/flow/run?share=" +
                flowId, // replace your ngraphx server api endpoint
              headers: () => {
                return {
                  "Content-Type": "application/json",
                };
              },
              wrapPayload: (message: string) => {
                return JSON.stringify({
                  flow_id: flowId,
                  params: { backstory: "文章编写" },
                  messages: [
                    {
                      role: "human",
                      content: message,
                    },
                  ],
                });
              },
              parseMessage: (message: string) => {
                // console.log(message);
                let msg = message.replaceAll("data: ", "");
                msg = msg.replace(/^\s/, "");
                return {
                  role: "assistant",
                  content: msg,
                };
              },
              protocol: "sse",
            },
          },
        },
      });
      return () => {
        aiEditor.destroy();
      };
    }
  }, []);

  return (
    <>
      <div>
        <h1>AiEditor，一个面向 AI 的富文本编辑器，使用 NGraphX+GLM4-9B 驱动</h1>
      </div>
      <div ref={divRef} style={{ height: "100vh", width: "100vw" }} />
    </>
  );
}
