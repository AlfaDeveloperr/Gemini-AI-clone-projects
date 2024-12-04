import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");  // 'İnput' yerine 'input' olarak düzeltildi
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setResultData((prev) => prev + nextWord);
        }, 75 * index);
    };

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    };

    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);

        let response;
        const finalPrompt = prompt || input;

        if (finalPrompt) {
            response = await runChat(finalPrompt);
            setRecentPrompt(finalPrompt);
            setPrevPrompts((prev) => [...prev, finalPrompt]);
        }

        let formattedResponse = response
            .split("**")
            .map((text, index) =>
                index % 2 === 1 ? `<b>${text}</b>` : text
            )
            .join("")
            .replace(/\*/g, "<br/>");

        let responseArray = formattedResponse.split(" ");
        responseArray.forEach((word, index) => {
            delayPara(index, word + " ");
        });

        setInput("");  // Input alanını temizliyoruz
        setLoading(false);
    };

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,  // 'input' düzeltildi
        setInput,
        newChat,
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
