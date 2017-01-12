interface Module {
  hot: {
    accept: () => void;
    dispose: (callback: () => void) => void;
  } | null;
}

declare const module: Module;