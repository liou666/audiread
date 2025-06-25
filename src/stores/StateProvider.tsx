import { createContext, createSignal, useContext } from 'solid-js'
import type { Accessor, ParentComponent, Setter } from 'solid-js'

export interface GlobalState {
  preText: string
  audioUrl: string
  isSynthetic: boolean
  currentPreviewVoice: string | null
  isPreviewLoading: boolean
  currentPreviewStop: (() => void) | null
}
export type GlobalStateContextType = [
  Accessor<GlobalState>,
  {
    resetGlobalState: () => void
    setGlobalState: Setter<GlobalState>
  },
]

const GlobalStateContext = createContext<GlobalStateContextType>()

export const defaultData: GlobalState = {
  preText: '',
  audioUrl: '',
  isSynthetic: false,
  currentPreviewVoice: null,
  isPreviewLoading: false,
  currentPreviewStop: null,
}

export const GlobalStateProvider: ParentComponent = (props) => {
  const [globalState, setGlobalState] = createSignal<GlobalState>(defaultData)

  const store: GlobalStateContextType = [globalState,
    {
      resetGlobalState() {
        setGlobalState(defaultData)
      },
      setGlobalState,
    },
  ]
  return (
    <GlobalStateContext.Provider value={store}>
      {props.children}
    </GlobalStateContext.Provider>
  )
}

export function useGlobalState() { return useContext(GlobalStateContext)! }
