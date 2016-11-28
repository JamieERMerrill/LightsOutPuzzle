var configMode = true;
var lowerBound = 0;
var upperBound = 4;

var log = [];

function onClick(idNumber)
{
    if(configMode == false)
    {
        log.push(idNumber);

        var asInt = parseInt(idNumber);
        swapState(idNumber);

        var lower = asInt - 1;
        var upper = asInt + 1;
        if(lower >= lowerBound)
        {
            swapState(lower.toString());
        }
        if(upper <= upperBound)
        {
            swapState(upper.toString());
        }
    }
    else
    {
        swapState(idNumber);
    }
}

function swapState(idNumber)
{
    var text = getButton(idNumber).text();
    if(text == "g")
    {
        getButton(idNumber).text("r");
    }
    else if(text == "r")
    {
        getButton(idNumber).text("g");
    }
}

function getButton(idNumber)
{
    return $("#" + idNumber)
}

function getLog()
{
    alert(log.toString());
}

function toggleState()
{
    configMode = !configMode;
    setConfigStateText();
}

function setConfigStateText()
{
    var value = "On";
    if(configMode == false)
    {
        value = "Off"
    }

    $(".configState").text("Config Mode is " + value);
}

function clearLog()
{
    log = [];
}

function addButton()
{
    generateButtons(1);
    upperBound += 1;
}

function removeButton()
{
    if(upperBound > lowerBound)
    {
        generateButtons(-1);
        upperBound -= 1;
    }
}

function getButtonAtColumn(column)
{
    rowObj = $(".buttons").find('tr');
    return rowObj.find('td:eq(' + column + ")");
}

function getButtonHTML(column)
{
    return "<td><button id='" + column + "' onclick='onClick(this.id)'>r</button></td>";
}

function generateButtons(step)
{
    // Add
    if(step == 1)
    {
        getButtonAtColumn(upperBound).after(getButtonHTML(upperBound));
    }
    // Remove
    else if(step == -1)
    {
        getButtonAtColumn(upperBound).remove();
    }
    // Generate
    else if(step == 9001)
    {
        for(var i = lowerBound + 1 ; i <= upperBound ; i++)
        {
            console.log(i);
            getButtonAtColumn(i-1).after(getButtonHTML(i));
        }
    }
}

$(document).ready(setConfigStateText);
$(document).ready(function(){generateButtons(9001)});
