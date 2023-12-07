type Base = {
    title: string
    description: string
}

type SceneInfo = Base & {
    date: string
}

type SceneInfoStore = SceneInfo & {
    key: string
}

type SceneInfoForm = Base

export { SceneInfo, SceneInfoForm, SceneInfoStore }