import React, { ChangeEvent, useEffect, useState } from "react";
import "./Card.css";
import { classnames } from "./utils/util";

const QQREG = /\d{5,11}/;

export const Card: React.FC<{}> = () => {
  const [valid, setValid] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

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

    setValid(!QQREG.test(value));
  };

  const renderResult = () => {
    return loading ? (
      <div className="content-wrapper">
        <img className="icon-loading" src="/assets/loading.svg" alt="loading" />
      </div>
    ) : (
      <div className="card-item">
        <img
          className="card-item_avatar"
          src="https://q2.qlogo.cn/headimg_dl?spec=100&dst_uin=791773678"
          alt=""
        />
        <div className="card-item_info">
          <div className="card-item_username">F@FO</div>
          <div className="card-item_number">791773678</div>
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
