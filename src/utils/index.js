/**
  * Validates a cron expression.
  *
  * @param cronExpression The expression to validate
  * @return True is expression is valid
  */
 export function cronValidate(cronExpression) {
   if(!cronExpression){
     return false;
   }
  //alert("校验函数的开始！");
  var cronParams = cronExpression.split(" ");

  if (cronParams.length < 5 || cronParams.length > 6) {
    return false;
  }

  //CronTrigger cronTrigger = new CronTrigger();
  //cronTrigger.setCronExpression( cronExpression );

  if (cronParams[2] == "?" || cronParams[4] == "?") {
    //Check seconds param
    // if (!checkSecondsField(cronParams[0])) {
    //   return false;
    // }

    //Check minutes param
    if (!checkMinutesField(cronParams[0])) {
      return false;
    }

    //Check hours param
    if (!checkHoursField(cronParams[1])) {
      return false;
    }

    //Check day-of-month param
    if (!checkDayOfMonthField(cronParams[2])) {
      return false;
    }

    //Check months param
    if (!checkMonthsField(cronParams[3])) {
      return false;
    }

    //Check day-of-week param
    // if (!checkDayOfWeekField(cronParams[4])) {
    //   return false;
    // }

    //Check year param
    if (cronParams.length == 6) {
      if (!checkYearField(cronParams[5])) {
        return false;
      }
    }

    return true;
  } else {
    return false;
  }
}

// function checkSecondsField(secondsField) {
//   return checkField(secondsField, 0, 59);
// }


function checkField(filed, minimal, maximal) {
  if (filed.indexOf("-") > -1) {
    var startValue = filed.substring(0, filed.indexOf("-"));
    var endValue = filed.substring(filed.indexOf("-") + 1);

    if (!(checkIntValue(startValue, minimal, maximal, true) && checkIntValue(endValue, minimal, maximal, true))) {
      return false;
    }
    try {
      var startVal = parseInt(startValue, 10);
      var endVal = parseInt(endValue, 10);

      return endVal > startVal;
    } catch (e) {
      return false;
    }
  } else if (filed.indexOf(",") > -1) {
    return checkListField(filed, minimal, maximal);
  } else if (filed.indexOf("/") > -1) {
    return checkIncrementField(filed, minimal, maximal);
  } else if (filed.indexOf("*") != -1) {
    return true;
  } else {
    return checkIntValue(filed, minimal, maximal);
  }
}

function checkIntValue(value, minimal, maximal, checkExtremity) {
  try {
    var val = parseInt(value, 10);
    //判断是否为整数
    if (value == val) {
      if (checkExtremity) {
        if (val < minimal || val > maximal) {
          return false;
        }
      }

      return true;
    }

    return false;
  } catch (e) {
    return false;
  }
}

function checkMinutesField(minutesField) {
  return checkField(minutesField, 0, 59);
}

function checkHoursField(hoursField) {
  return checkField(hoursField, 0, 23);
}

function checkDayOfMonthField(dayOfMonthField) {
  if (dayOfMonthField == "?") {
    return true;
  }

  if (dayOfMonthField.indexOf("L") >= 0) {
    return checkFieldWithLetter(dayOfMonthField, "L", 1, 7, -1, -1);
  } else if (dayOfMonthField.indexOf("W") >= 0) {
    return checkFieldWithLetter(dayOfMonthField, "W", 1, 31, -1, -1);
  } else if (dayOfMonthField.indexOf("C") >= 0) {
    return checkFieldWithLetter(dayOfMonthField, "C", 1, 31, -1, -1);
  } else {
    return checkField(dayOfMonthField, 1, 31);
  }
}


function checkMonthsField(monthsField) {
  /*        monthsField = StringUtils.replace( monthsField, "JAN", "1" );
        monthsField = StringUtils.replace( monthsField, "FEB", "2" );
        monthsField = StringUtils.replace( monthsField, "MAR", "3" );
        monthsField = StringUtils.replace( monthsField, "APR", "4" );
        monthsField = StringUtils.replace( monthsField, "MAY", "5" );
        monthsField = StringUtils.replace( monthsField, "JUN", "6" );
        monthsField = StringUtils.replace( monthsField, "JUL", "7" );
        monthsField = StringUtils.replace( monthsField, "AUG", "8" );
        monthsField = StringUtils.replace( monthsField, "SEP", "9" );
        monthsField = StringUtils.replace( monthsField, "OCT", "10" );
        monthsField = StringUtils.replace( monthsField, "NOV", "11" );
        monthsField = StringUtils.replace( monthsField, "DEC", "12" );*/

  monthsField = monthsField.replace("JAN", "1");
  monthsField = monthsField.replace("FEB", "2");
  monthsField = monthsField.replace("MAR", "3");
  monthsField = monthsField.replace("APR", "4");
  monthsField = monthsField.replace("MAY", "5");
  monthsField = monthsField.replace("JUN", "6");
  monthsField = monthsField.replace("JUL", "7");
  monthsField = monthsField.replace("AUG", "8");
  monthsField = monthsField.replace("SEP", "9");
  monthsField = monthsField.replace("OCT", "10");
  monthsField = monthsField.replace("NOV", "11");
  monthsField = monthsField.replace("DEC", "12");

  return checkField(monthsField, 1, 31);
}

function checkDayOfWeekField(dayOfWeekField) {
  /*        dayOfWeekField = StringUtils.replace( dayOfWeekField, "SUN", "1" );
        dayOfWeekField = StringUtils.replace( dayOfWeekField, "MON", "2" );
        dayOfWeekField = StringUtils.replace( dayOfWeekField, "TUE", "3" );
        dayOfWeekField = StringUtils.replace( dayOfWeekField, "WED", "4" );
        dayOfWeekField = StringUtils.replace( dayOfWeekField, "THU", "5" );
        dayOfWeekField = StringUtils.replace( dayOfWeekField, "FRI", "6" );
        dayOfWeekField = StringUtils.replace( dayOfWeekField, "SAT", "7" );*/

  dayOfWeekField = dayOfWeekField.replace("SUN", "1");
  dayOfWeekField = dayOfWeekField.replace("MON", "2");
  dayOfWeekField = dayOfWeekField.replace("TUE", "3");
  dayOfWeekField = dayOfWeekField.replace("WED", "4");
  dayOfWeekField = dayOfWeekField.replace("THU", "5");
  dayOfWeekField = dayOfWeekField.replace("FRI", "6");
  dayOfWeekField = dayOfWeekField.replace("SAT", "7");

  if (dayOfWeekField == "?") {
    return true;
  }

  if (dayOfWeekField.indexOf("L") >= 0) {
    return checkFieldWithLetter(dayOfWeekField, "L", 1, 7, -1, -1);
  } else if (dayOfWeekField.indexOf("C") >= 0) {
    return checkFieldWithLetter(dayOfWeekField, "C", 1, 7, -1, -1);
  } else if (dayOfWeekField.indexOf("#") >= 0) {
    return checkFieldWithLetter(dayOfWeekField, "#", 1, 7, 1, 5);
  } else {
    return checkField(dayOfWeekField, 1, 7);
  }
}

function checkYearField(yearField) {
  return checkField(yearField, 1970, 2099);
}


function checkFieldWithLetter(value, letter, minimalBefore, maximalBefore,
  minimalAfter, maximalAfter) {
  var canBeAlone = false;
  var canHaveIntBefore = false;
  var canHaveIntAfter = false;
  var mustHaveIntBefore = false;
  var mustHaveIntAfter = false;

  if (letter == "L") {
    canBeAlone = true;
    canHaveIntBefore = true;
    canHaveIntAfter = false;
    mustHaveIntBefore = false;
    mustHaveIntAfter = false;
  }
  if (letter == "W" || letter == "C") {
    canBeAlone = false;
    canHaveIntBefore = true;
    canHaveIntAfter = false;
    mustHaveIntBefore = true;
    mustHaveIntAfter = false;
  }
  if (letter == "#") {
    canBeAlone = false;
    canHaveIntBefore = true;
    canHaveIntAfter = true;
    mustHaveIntBefore = true;
    mustHaveIntAfter = true;
  }

  var beforeLetter = "";
  var afterLetter = "";

  if (value.indexOf(letter) >= 0) {
    beforeLetter = value.substring(0, value.indexOf(letter));
  }

  if (!value.endsWith(letter)) {
    afterLetter = value.substring(value.indexOf(letter) + 1);
  }

  if (value.indexOf(letter) >= 0) {
    if (letter == value) {
      return canBeAlone;
    }

    if (canHaveIntBefore) {
      if (mustHaveIntBefore && beforeLetter.length == 0) {
        return false;
      }

      if (!checkIntValue(beforeLetter, minimalBefore, maximalBefore, true)) {
        return false;
      }
    } else {
      if (beforeLetter.length > 0) {
        return false;
      }
    }

    if (canHaveIntAfter) {
      if (mustHaveIntAfter && afterLetter.length == 0) {
        return false;
      }

      if (!checkIntValue(afterLetter, minimalAfter, maximalAfter, true)) {
        return false;
      }
    } else {
      if (afterLetter.length > 0) {
        return false;
      }
    }
  }

  return true;
}

/*    function checkIntValue(value, minimal, maximal) {
      return checkIntValue(value, minimal, maximal, true);
  } */

function checkIncrementField(value, minimal, maximal) {
  var start = value.substring(0, value.indexOf("/"));

  var increment = value.substring(value.indexOf("/") + 1);

  if (!("*" == start)) {
    return checkIntValue(start, minimal, maximal, true) && checkIntValue(increment, minimal, maximal, false);
  } else {
    return checkIntValue(increment, minimal, maximal, true);
  }
}



function checkListField(value, minimal, maximal) {
  var st = value.split(",");

  var values = new Array(st.length);

  for (var j = 0; j < st.length; j++) {
    values[j] = st[j];
  }

  var previousValue = -1;

  for (var i = 0; i < values.length; i++) {
    var currentValue = values[i];

    if (!checkIntValue(currentValue, minimal, maximal, true)) {
      return false;
    }

    try {
      var val = parseInt(currentValue, 10);

      previousValue = val;

      // if (val <= previousValue) {
      //   return false;
      // } else {
      //   previousValue = val;
      // }
    } catch (e) {
      // we have always an int
    }
  }

  return true;
}