import React, { useEffect, useState } from "react";
import "./Card.css";

export const Card: React.FC<{}> = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {

  }, []);

  const renderResult = () => {
    return loading ? (
      <img className="icon-loading" src="/assets/loading.svg" alt="loading"/>
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

      <div className="card-input-box">
        <div>
          <input type="text" />
        </div>
      </div>

      <div className="card-result-box">
        <div>{renderResult()}</div>
      </div>
    </section>
  );
};
