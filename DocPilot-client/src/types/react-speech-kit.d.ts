// react-speech-kit.d.ts
declare module "react-speech-kit" {
  import React from "react";

  interface SpeechRecognitionOptions {
    onResult: (result: any) => void;
    onEnd?: () => void;
    onError?: (event: any) => void;
    continuous?: boolean;
    lang?: string;
  }

  interface UseSpeechRecognition {
    listen: () => void;
    listening: boolean;
    stop: () => void;
    supported: boolean;
  }

  export function useSpeechRecognition(
    options: SpeechRecognitionOptions
  ): UseSpeechRecognition;

  export const SpeechRecognition: {
    startListening: (options: SpeechRecognitionOptions) => void;
    stopListening: () => void;
    abortListening: () => void;
    getRecognition: () => any;
  };

  interface SpeakOptions {
    text: string;
    voice?: SpeechSynthesisVoice;
    rate?: number;
    pitch?: number;
    volume?: number;
  }

  interface UseSpeechSynthesis {
    speak: (options: SpeakOptions) => void;
    speaking: boolean;
    supported: boolean;
    cancel: () => void;
    pause: () => void;
    resume: () => void;
    voices: SpeechSynthesisVoice[];
  }

  export function useSpeechSynthesis(): UseSpeechSynthesis;
}
