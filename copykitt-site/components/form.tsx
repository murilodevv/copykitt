interface FormProps {
    prompt: string;
    setPrompt: any;
    onSubmit: any;
    isLoading: boolean;
    characterLimit: number;
}

const Form: React.FC<FormProps> = (props) => {

    const isPromptValid = props.prompt.length >= 32;
    const updatePromptValue = (text:string) => {
        if (text.length <= props.characterLimit) {
            props.setPrompt(text);
        }
    }

    let statusColor = "text-slate-500";
    let statusText = null
    if (isPromptValid) {
        statusColor = "text-red-400";
        statusText = `Input must  be less than ${props.characterLimit} characters.`
    }

    return (
    <>
    <div className="mb-6">
    <p>Tell me what your brand is about and i will generate copy and keywords for you.</p>
    </div>
    <input className="p-3 w-full rounded-md focus:outline-teal-400 focus:outline text-black" type="text" placeholder="coffee" value={props.prompt} onChange={(e) => updatePromptValue(e.currentTarget.value)}/>
    <div className={statusColor + " flex justify-between my-2 mb-6 text-sm"}>
        <div>{statusText}</div>
        <div>{props.prompt.length}/{props.characterLimit}</div>
    </div>
    <button className="bg-gradient-to-r from-teal-400 to-blue-500 disabled:opacity-50 w-full p-3 rounded-md" onClick={props.onSubmit} disabled={props.isLoading || isPromptValid}>Submit</button></>
    );
};

export default Form;