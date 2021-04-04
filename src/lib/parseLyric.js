const parseExp = /\[([0-9]{2}):([0-9]{2})\.([0-9]{2,3})\]/
function parseLyric(lyrics) {
  if(!lyrics) return
  const lineStrings = lyrics.split('\n')
  const lyricList = []
  for (const line of lineStrings) {
    if (line) {
      const result = parseExp.exec(line)
      if(!result) continue
      //measurement unit: ms
      const time1 = result[1] * 60 * 1000
      const time2 = result[2] * 1000
      const time3 = result[3] * 10;
      const totalTime=time1+time2+time3;
      const textContent=line.replace(parseExp,'')
      lyricList.push({totalTime,textContent})
    }
  }
  return lyricList
}
export default parseLyric;