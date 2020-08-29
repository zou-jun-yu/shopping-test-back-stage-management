module.exports = {
  apps: [
    {
      name: "ShoppingManage",
      log_date_format: "YYYY-MM-DD HH:mm Z",
      watch: true,
      ignore_watch: ["node_modules", "build"],
    },
  ],

  deploy: {
    production: {
      user: "root",
      host: "47.115.157.0",
      ref: "origin/master",
      repo: "git@github.com:zou-uoz/shopping-test-back-stage-management.git",
      path: "/root/shopping-test/shopping-test-back-stage-management",
      "post-deploy": "npm install&&npm run build",
    },
  },
};
