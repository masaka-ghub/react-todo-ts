import React, { useEffect, useState } from 'react';

const Timer = () => {
  const [now, setNow] = useState('時刻取得中...');

  useEffect(() => {
    // 10秒毎にntpにfetchし、現在時刻を更新する
    const id = setInterval(async () => {
      console.log(`${id}:timer reflesh start`);
      const res = await (await fetch('https://ntp-a1.nict.go.jp/cgi-bin/json', { mode: 'cors' })).json();
      const current = new Date(res.st * 1000);
      setNow(current.toLocaleString());
      console.log(`${id}:timer reflesh end`);
    }, 10000);

    // unmount時に実行されるcleanup関数
    return () => {
      console.log(`clear setInterval - id:${id}`);
      clearInterval(id);
    };
  }, []);

  return <div>{now}</div>;
};

export default Timer;
