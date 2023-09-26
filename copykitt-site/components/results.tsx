interface ResultsProps {
    prompt: string;
    snippet: string;
    keywords: string[];
    onBack: any;
}

const Results: React.FC<ResultsProps> = (props) => {

    const keywordElements = [];
    for (let i = 0; i < props.keywords.length; i++) {
        const element = <div key={i}>#{props.keywords[i]}</div>;
        keywordElements.push(element)
    }

    return (
    <>
    <div>
    <b>Prompt</b>
    <div>{props.prompt}</div>
    <b>Snippet</b>
    <div>{props.snippet}</div>
    <b>Keywords</b>
    <div>{keywordElements}</div>
    </div>
    <button onClick={props.onBack}>Back</button>
    </>
    );
};

export default Results;