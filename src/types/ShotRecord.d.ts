type Base = {
    title: string
    description: string
    tags: string[]
}

type ShotRecord = Base & {
    date: string
}

type ShotRecordStore = ShotRecord & {
    key: string
}

type ShotRecordForm = Base & {
    time: string
}

export { ShotRecord, ShotRecordForm, ShotRecordStore }