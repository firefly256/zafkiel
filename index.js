import axios from "axios";

axios
  .request({
    method: "get",
    url: "https://api-takumi.mihoyo.com/binding/api/getUserGameRolesByCookie?game_biz=hk4e_cn",
    headers: {
      "accept-language":
        "zh-CN,zh;q=0.9,ja-JP;q=0.8,ja;q=0.7,en-US;q=0.6,en;q=0.5",
      "User-Agent":
        "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) miHoYoBBS/2.3.0",
      Referer:
        "https://webstatic.mihoyo.com/bbs/event/signin-ys/index.html?bbs_auth_required=true&act_id=e202009291139501&utm_source=bbs&utm_medium=mys&utm_campaign=icon",
      Host: "api-takumi.mihoyo.com",
      "x-rpc-channel": "appstore",
      "x-rpc-app_version": "2.3.0",
      "x-requested-with": "com.mihoyo.hyperion",
      "x-rpc-client_type": "5",

      "Content-Type": "application/json;charset=UTF-8",
    },
  })
  .then((res) => {
    console.log("res :>> ", res);
  });
