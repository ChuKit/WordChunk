document.getElementById("inputfile").addEventListener("change", function() {
  const fr = new FileReader();
  fr.onload = function(){
    document.getElementById("article").textContent = fr.result;
    produceChunkReport(fr.result);
  }
  fr.readAsText(this.files[0]);
})

function produceChunkReport(article) {
  const words = extractWords(article);
  const wordPerChunk = document.getElementById("wordPerChunk").value;
  const chunks = chunkWords(words, wordPerChunk);
  displayReport(chunks);
}

function extractWords(str) {
  const enterAndDotRemoved = str.replace(/(\r\n|\n|\r)/gm, " ");
  const splits = enterAndDotRemoved.split(" ");
  return splits.filter(word => word !== "");
}

function chunkWords(arr, wordPerChunk) {
  wordPerChunk = parseInt(wordPerChunk);
  if (wordPerChunk >= arr.length) {
    return arr;
  }

  let chunks = [];
  for (var i = 0; i < arr.length - (wordPerChunk - 1); i++) {
    chunks[i] = arr
      .slice(i, i + wordPerChunk)
      .reduce((chunk, word) => chunk + " " + word);
  }
  return chunks;
}

function displayReport(chunks) {
  let html = chunks.reduce((output, chunk) => output + "<br>" + chunk);
  document.getElementById("report").innerHTML = html;

}
