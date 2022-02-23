export interface BlogBase {
    title: string
    content: string
    timestamp: string
    tags: string[]
    userName: string
}

export interface Blog extends BlogBase {
    id: string
}
