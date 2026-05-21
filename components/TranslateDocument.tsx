"use client";

import * as Y from "yjs";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState, useTransition ,SubmitEvent} from "react";
import { BotIcon, LanguagesIcon } from "lucide-react";
import { toast } from "sonner";
import Markdown from "react-markdown";



type Language = 
| "english" 
| "spanish" 
| "portuguese"
| "french"
| "german"
| "chinese"
| "arabic"
| "hindi"
| "russian"
| "japanese";

const languages: Language[] = [
"english", "spanish",
"portuguese",
"french",
"german",
"chinese",
"arabic",
"hindi",
"russian",
"japanese"
];



function TranslateDocument({doc}: {doc: Y.Doc}) {
    const [isOpen, setIsOpen] = useState(false);
    const [summary, setSummary] = useState("");
    const [question, setQuestion] = useState("");
    const [language, setLanguage] = useState<string>("");
    const [isPending , startTransition] = useTransition();  
    
   

    const handleAskQuestion = async (e: SubmitEvent) => {
        e.preventDefault();

        startTransition(async () => {
                // Translation magic happens here when we click on translate button

               // setSummary("");
              // Do this: Get the root text or extract text directly from the shared type
//const sharedType = doc.get("document-store");

// If "document-store" is a Y.Text type, you can just do:
//const documentData = sharedType.toString(); 

// If it's a Y.Map or custom block array, extract just string fields:
 //const documentData = JSON.stringify(sharedType.toJSON());


 const rawData = doc.get("document-store").toJSON();

 const documentData = JSON.stringify(rawData);

 console.log(documentData);


           // const documentData = doc.get("document-store").toJSON();

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/translateDocument`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        documentData,
                        targetLang: language,
                    }),
                }
            );
            if(res.ok){
                const {translated_text} = await res.json();

                setSummary(translated_text);
                toast.success("Translated Summary Successfully!")
            }
            else{
                toast.success("FAILED!")
            }
        })
    };


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
    <Button variant="outline"  >
<DialogTrigger className="flex items-center gap-2">
    <LanguagesIcon /> Translate
</DialogTrigger>
</Button>
<DialogContent>
  <DialogHeader>
    <DialogTitle>Translate the Document</DialogTitle>
    <DialogDescription>
      Select a Language and AI will translate a summary of the document in the
      selected language.
    </DialogDescription>
    <hr className="mt-5"/>

    {question && <p className="mt-5 text-gray-500">Q: {question}</p>}
  </DialogHeader>

    {
        summary && (
            
            <div className="flex flex-col items-start max-h-96 overflow-y-scroll gap-2 p-5 bg-gray-100"> 
            <div className="flex">
            <BotIcon className="w-10 shrink-0" />
            
            <p className="font-bold">
                GPT {isPending? "is thinking..." : "Says:"}
            </p> 
            </div>
            <p>{isPending? "Thinking..." : <Markdown>{summary}</Markdown>}</p>
            </div>
        )
    }
    
  <form className="flex gap-2" onSubmit={handleAskQuestion}>
    <Select
    value={language}
    onValueChange={(value) => setLanguage(value || "")}
    >
    
    <SelectTrigger>
        <SelectValue placeholder="Select a Language" />
    </SelectTrigger>

    <SelectContent>
        {languages.map((language) => (
            <SelectItem key={language} value={language}>
                {language.charAt(0).toUpperCase() + language.slice(1)}
            </SelectItem>
        ))}
    </SelectContent>

    </Select>
    <Button type="submit" disabled={!language || isPending}>
        {isPending? "Translating..." : "Translate"}
    </Button>
    
    
  </form>




</DialogContent>
</Dialog>
  )
}

export default TranslateDocument