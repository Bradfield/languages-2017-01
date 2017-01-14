
test the lexer

```
$ node dev/tokenize.js <<< '
1
2 // foo bar
45
'
NUM 1
NUM 2
NUM 45
```
