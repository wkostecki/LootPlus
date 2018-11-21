String.prototype.replaceAt = function(index, text){
    return this.substr(0, index) + text + this.substr(index + text.length);
}

String.prototype.addTagAt = function(index, tagBegin, tagEnd, size){
    return this.substr(0, index) + tagBegin + this.substr(index, size) + tagEnd + this.substr(index + size);
}

String.prototype.replaceAt_with_size = function(index, text, size){
    return this.substr(0, index) + text + this.substr(index + size);
}

Array.prototype.shiftAtIndex = function(index)
{
    var newArray = [];
    var naI = 0;
    var len = this.length;
    for (var i = 0; i < len; i++)
    {
        if (i == index)
        {
            this.shift();
        }
        else
            newArray[naI++] = this.shift();
    }
    return newArray;
}