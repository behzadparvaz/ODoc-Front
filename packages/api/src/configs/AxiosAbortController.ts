export default class AxiosAbortController {

  private controllers: Map<any, any>;

  constructor() {
    this.controllers = new Map()
  }

  public getAbort(url: string | undefined) {
    return this.controllers.get(url)
  }

  public getSignal(url: string | undefined) {
    const abort = this.getAbort(url)
    return abort.signal
  }

  private abortSignal(url: string | undefined) {
    if (this.controllers.has(url)) {
      this.getAbort(url).abort()
    }
  }

  public deleteSignal(url: string | undefined) {
    this.abortSignal(url)
    this.controllers.delete(url)
  }

  public setSignal(url: string | undefined) {
    this.deleteSignal(url)

    const abortSignal = new AbortController()
    this.controllers.set(url, abortSignal)
  }

}
