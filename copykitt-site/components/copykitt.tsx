"use client";

import React from "react";
import Form from "./form";
import Results from "./results";
import Image from "next/image";
import logo from "../public/copykittLogo.svg"

const CopyKitt: React.FC = () => {
    const CHARACTER_LIMIT: number = 32;
    const ENDPOINT: string = "https://02xon8basj.execute-api.us-east-1.amazonaws.com/prod/generate_snippet_keywords";
    const [prompt, setPrompt] = React.useState("");
    const [snippet, setSnippet] = React.useState("");
    const [keywords, setKeywords] = React.useState([]);
    const [hasResult, setHasResults] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const onSubmit = () => {
        console.log("Submitting: " + prompt);
        setIsLoading(true);
        fetch(`${ENDPOINT}?prompt=${prompt}`)
        .then((res) => res.json())
        .then(onResult);
    };

    const onResult = (data: any) => {
        setSnippet(data.snippet);
        setKeywords(data.keywords);
        setHasResults(true);
        setIsLoading(false);
    }

    const onReset = () => {
        setPrompt("");
        setHasResults(false);
        setIsLoading(false);
    }

    let displayedElement = null;

    if (hasResult) {
        displayedElement = <Results snippet={snippet} keywords={keywords} onBack={onReset} prompt={prompt}/>
    } else {
        displayedElement = (
            <Form prompt={prompt} setPrompt={setPrompt} onSubmit={onSubmit} isLoading={isLoading} characterLimit={CHARACTER_LIMIT}/>
        );
    };

    const gradientTextStyle =
    "text-white text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 font-light w-fit";

    return ( 
        <>
        <div className="flex justify-center items-center h-screen p-4">
            <div className="w-auto mx-auto">
                <div className="max-w-md mx-auto">
                    <div className="bg-slate-800 p-6 rounded-md text-white">
                        <div className="flex justify-center items-center p-3">
                            <Image src={logo} alt={"CopyKitt Logo"} width={70} height={70}></Image>
                            <h1 className={gradientTextStyle + " text-2xl text-white font-light"}>CopyKitt</h1>
                        </div>
                        {displayedElement}
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default CopyKitt;