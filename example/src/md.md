我遇到一个新的问题, 有关于npm项目中的路径解析, 当在npm项目中使用import语句引入一个node_modules中的库的时候, node或者说npm是如何将from后面的字符正确解析路径, 而不是当作一个单纯的绝对路径的?

举个例子, 我写了这样一段代码, 在getAbsPath中,我想将originPath和sourcePath拼接为一个完整的绝对路径, 但是当遇到a.vue中的代码时, “vue”将会被判断为一个绝对路径, 而不是node_modeuls中的包路径

```
function getAbsPath(originPath, sourcePath) {
  if (path.isAbsolute(sourcePath)) return sourcePath;
  return path.resolve(path.dirname(originPath), sourcePath);
}

// a.vue
import Vue from 'vue'
```
