import React, {
  ChangeEvent,
  createRef,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import "./Card.css";
import { AxiosInstance } from "./utils/request";
import { classnames, debounce } from "./utils/util";

const QQREG = /\d{5,11}/;
const API_URL = "https://api.uomg.com/api/qq.info";

type InputProps = {
  onChange: Function;
};

const Input: React.FC<InputProps> = ({ onChange }) => {
  const ref = createRef<HTMLInputElement>();

  const valueRef = useRef<string>("");

  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    let currentValue = e.target.value + "";
    // remove no-number
    currentValue = currentValue.replace(/\D/g, "");
    // max-length
    if (currentValue.length > 11) {
      currentValue = currentValue.substring(0, 11);
    }
    // set value to origin input element
    e.target.value = currentValue;

    // only fetch data when value is correct qq number
    if (valueRef.current !== currentValue) {
      onChange(currentValue);
      valueRef.current = currentValue;
    }
  };

  return (
    <input
      ref={ref}
      type="text"
      onChange={onValueChange}
      placeholder="请输入5-11位QQ号"
    />
  );
};

const InputWrapper = memo(Input);

export const Card: React.FC<{}> = () => {
  const [value, setValue] = useState<string>("");
  const [valid, setValid] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [resp, setResp] = useState<ServerResponseData | null>(null);

  const onChange = useCallback((currentValue: string) => {
    setValid(() => QQREG.test(currentValue));
    setValue(() => currentValue);
  }, []);

  const fetchServerData = (params: any) => {
    setLoading(true);
    AxiosInstance.get(API_URL, params)
      .then((res: ServerResponseData) => setResp(res))
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchData = useCallback(debounce(fetchServerData, 800), []);

  useEffect(() => {
    valid && value && fetchData({ qq: value });
  }, [ valid, value, fetchData ]);

  const resultContent = loading ? (
    <div className="content-wrapper">
      <img className="icon-loading" src="/assets/loading.svg" alt="loading" />
    </div>
  ) : resp ? (
    resp.code !== 1 ? (
      <div className="error-tip">
        <div className="error-tip_text">{resp?.msg || "服务器异常"}</div>
      </div>
    ) : (
      <div className="card-item">
        <img className="card-item_avatar" src={resp.qlogo} alt={resp.name} />
        <div className="card-item_info">
          <div className="card-item_username">{resp.name}</div>
          <div className="card-item_number">{resp.qq}</div>
        </div>
      </div>
    )
  ) : null;

  return (
    <section className="card-wrapper">
      <div className="card-title">
        <div>QQ号查询</div>
      </div>

      <div
        className={classnames({
          "card-input-box": true,
          "card-input-box_error": !valid,
        })}
      >
        <InputWrapper onChange={onChange}></InputWrapper>
      </div>

      <div className="card-result-box">{resultContent}</div>
    </section>
  );
};
