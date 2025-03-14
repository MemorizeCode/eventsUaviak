export interface EventsListSchema {
    eventList: EventSchema[]
    fetchEventList: ()=>void
}

export interface EventSchema {
    id:number
    title: string
    description: string
    date: Date | any
    times: Date | any
    duration: number
    cabinet: number
    people_count: number
    class: string | number
    spesial: string | number | undefined | null
    prepod: string 
    whoClasses: string
}

