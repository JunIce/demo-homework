type AxiosOptions = {
  url: string;
  method?: string;
  headers?: {
    [key: string]: string;
  };
  params?: any;
  data?: any;
};

class Axios {
  private http({
    method,
    url,
    headers,
    params,
    data,
  }: AxiosOptions): Promise<any> {
    let xhr = new XMLHttpRequest();

    method = method || "GET";

    // set headers
    if (headers) {
      for (let key in headers) {
        xhr.setRequestHeader(key, headers[key]);
      }
    }

    // set params
    if (params) {
      let paramsString: string[] = [];

      for (let i in params) {
        paramsString.push(`${i}=${params[i]}`);
      }

      url += `?${paramsString.join("&")}`;
    }

    xhr.open(method, url, true);
    return new Promise((resolve, reject) => {
      xhr.onload = (response: any) => {
        if (xhr.readyState === 4) {
          resolve(JSON.parse(response.target.response));
        }
      };

      xhr.send(data || null);
    });
  }

  get(url: string, params?: any, options?: any): Promise<any> {
    options = options || {};
    return this.http({
      method: "GET",
      url,
      params,
      ...options,
    });
  }

  post(url: string, data?: any, options?: any) {
    options = options || {};
    return this.http({
      method: "POST",
      url,
      data,
      ...options,
    });
  }
}

const AxiosInstance = new Axios();

export { AxiosInstance };
