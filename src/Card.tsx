import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import "./Card.css";
import { AxiosInstance } from "./utils/request";
import { classnames, debounce } from "./utils/util";

const QQREG = /\d{5,11}/;

export const Card: React.FC<{}> = () => {
  const [value, setValue] = useState<string>("");
  const [valid, setValid] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [resp, setResp] = useState<ServerResponseData | null>(null);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value + "";
    // remove no-number
    value = value.replace(/\D/g, "");
    // max-length
    if (value.length > 11) {
      value = value.substring(0, 11);
    }
    // set value to origin input element
    e.target.value = value;

    let isValid = QQREG.test(value);

    setValid(!isValid);
    // only fetch data when value is correct qq number
    isValid && setValue(value);
  };



  useEffect(() => {
    fetchData({ qq: value });
  }, [value]);

  const fetchServerData = (params: any) => {
    setLoading(true);
    AxiosInstance.get("https://api.uomg.com/api/qq.info", params)
      .then((res: ServerResponseData) => setResp(res))
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchData = useCallback(debounce(fetchServerData, 800), []);

  const renderResult = () => {
    if (loading) {
      return (
        <div className="content-wrapper">
          <img
            className="icon-loading"
            src="/assets/loading.svg"
            alt="loading"
          />
        </div>
      );
    }

    if (!resp) return;

    if (resp?.code !== 1) {
      return (
        <div className="error-tip">
          <div className="error-tip_text">{resp?.msg || "服务器异常"}</div>
        </div>
      );
    }

    return (
      <div className="card-item">
        <img className="card-item_avatar" src={resp.qlogo} alt={resp.name} />
        <div className="card-item_info">
          <div className="card-item_username">{resp.name}</div>
          <div className="card-item_number">{resp.qq}</div>
        </div>
      </div>
    );
  };

  return (
    <section className="card-wrapper">
      <div className="card-title">
        <div>QQ号查询</div>
      </div>

      <div
        className={classnames({
          "card-input-box": true,
          "card-input-box_error": valid,
        })}
      >
        <div>
          <input
            type="text"
            onChange={onInputChange}
            placeholder="请输入5-11位QQ号"
          />
        </div>
      </div>

      <div className="card-result-box">
        <div>{renderResult()}</div>
      </div>
    </section>
  );
};
