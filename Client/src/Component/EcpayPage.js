import React, { useEffect } from 'react';

const EcpayPage = ({ ecpayHTML }) => {
  useEffect(() => {
    // 在 HTML 被插入後，立即提交表單
    //插入表單並手動提交： 如果 HTML 中沒有內嵌的自動提交 JavaScript
    //你可以在 React 中手動處理。創建一個 <form> 元素，插入到 DOM 中並提交。
    if (ecpayHTML) {
      const form = document.getElementById('allPayAPIForm');
      if (form) {
        form.submit();
      }
    }
  }, [ecpayHTML]);

  return (
    <div>
      {ecpayHTML ? (
        <div
          dangerouslySetInnerHTML={{ __html: ecpayHTML }} // 插入 HTML 內容
        />
      ) : (
        <p>正在載入支付頁面...</p> // 顯示加載狀態或錯誤信息
      )}
    </div>
  );
};

export default EcpayPage;
