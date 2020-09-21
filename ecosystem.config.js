module.exports = {
  apps: [
    {
      name: "ShoppingManage",
      log_date_format: "YYYY-MM-DD HH:mm Z",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
      // watch: true,
      // ignore_watch: ["node_modules", "build"],
    },
  ],

  deploy: {
    production: {
      user: "root",
      host: "47.115.157.0",
      ref: "origin/master",
      repo: "git@github.com:zou-uoz/shopping-back-stage-management.git",
      path: "/root/shopping/shopping-back-stage-management",
      "post-deploy":
      //   "git pull&&npm install&&npm run build&&cp -rf /root/shopping/shopping-back-stage-management/current/build/* /usr/share/nginx/html/back-manage/",
        "git pull&&npm run build&&cp -rf /root/shopping/shopping-back-stage-management/current/build/* /usr/share/nginx/html/back-manage/",
      env: {
        NODE_ENV: "production",
      },
    },
  },
};
