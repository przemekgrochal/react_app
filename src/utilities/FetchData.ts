import { threadId } from "worker_threads";

export class FetchData {
    public data: any = null;

    fetch(urlApi: string, methods: string | undefined, bodyData: any | null) {
        const download = async (urlApi: string) => {
            try {
                const response = await fetch(urlApi, {
                    method: methods,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization:
                            "Bearer HDOxDOwpo0acumRYzPl0SLcsxB51dIae7Pak",
                    },
                    body: bodyData ? JSON.stringify(bodyData) : null,
                });
                const result = await response.json();
                return result;
            } catch (err) {
                if (!window.navigator.onLine) {
                    console.log("Sprawdz połączenie z internetem!");
                }

                const timeOut = (url: string): void => {
                    setTimeout(function () {
                        fetch(url);
                    }, 5000);
                };

                timeOut(urlApi);
            }
        };

        return download(urlApi);
    }
}
