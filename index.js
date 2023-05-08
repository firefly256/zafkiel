import fs from "node:fs";
import path from "node:path";

const arr = [];
const fileDisplay = async (filePath) => {
  //根据文件路径读取文件，返回文件列表
  const files = fs.readdirSync(filePath);

  files.forEach((filename) => {
    //获取当前文件的绝对路径
    const filedir = path.join(filePath, filename);
    // fs.stat(path)执行后，会将stats类的实例返回给其回调函数。

    const stats = fs.statSync(filedir);

    // 是否是文件
    const isFile = stats.isFile();
    // 是否是文件夹
    const isDir = stats.isDirectory();
    if (isFile) {
      // 这块我自己处理了多余的绝对路径，第一个 replace 是替换掉那个路径，第二个是所有满足\\的直接替换掉
      arr.push(
        filedir
          .replace("D:\\lh\\study\\jiaoshoujia\\vue\\generator-lh-vue\\generators\\app\\", "")
          .replace(/\\/gim, "/")
      );
      // 最后打印的就是完整的文件路径了
      console.log("arr", arr);
    }
    // 如果是文件夹
    if (isDir) fileDisplay(filedir);
  });
};

fileDisplay("script");

const pathResolve = (dir) => path.resolve(process.cwd(), ".", dir);

arr.forEach((each) => {
  const path = pathResolve(each);
  try {
    import(`file://${path}`).then((res) => {
      console.log("res :>> ", res.default);
    });
  } catch {
    import(`${path}`).then((res) => {
      console.log("res :>> ", res.default);
    });
  }
});
