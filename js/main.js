
'use strict';
// Получить кнопку "Начать расчет" через id
let startCalc = document.getElementById('start');



let budgetValue           = document.body.getElementsByClassName('budget-value')[0],
    daybudgetValue        = document.body.getElementsByClassName('daybudget-value')[0],
    levelValue            = document.body.getElementsByClassName('level-value')[0],
    expensesValue         = document.body.getElementsByClassName('expenses-value')[0],
    optionalexpensesValue = document.body.getElementsByClassName('optionalexpenses-value')[0],
    incomeValue           = document.body.getElementsByClassName('income-value')[0],
    monthsavingsValue     = document.body.getElementsByClassName('monthsavings-value')[0],
    yearsavingsValue      = document.body.getElementsByClassName('yearsavings-value')[0];



// Получить оставшиеся поля через querySelector (статьи возможного дохода, чекбокс, сумма, процент, год, месяц, день)
let expensesItem = document.getElementsByClassName('expenses-item'),
    expensesBtn = document.getElementsByTagName('button')[0],
    optionalExpensesBtn = document.getElementsByTagName('button')[1],
    countBtn = document.getElementsByTagName('button')[2],
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
    income      = document.body.querySelector('.choose-income'),
    haveSavings = document.body.querySelector('#savings'),
    sumValue         = document.body.querySelector('#sum'),
    percentValue    = document.body.querySelector('#percent'),
    yearValue   = document.body.querySelector('.year-value'),
    monthValue  = document.body.querySelector('.month-value'),
    dayValue    = document.body.querySelector('.day-value');

    let money, time;
    
   

    startCalc.addEventListener('click', function() {
  
     time = prompt("Введите дату в формате YYYY-MM-DD","");
     money = +prompt("Ваш бюджет на месяц?","");

     while (isNaN(money)|| money == '' || money == null ) {
       money = prompt("Ваш бюджет?","");
     }
     appData.budget = money;
     appData.timeData = time;
     budgetValue.textContent = money;
     yearValue.value = new Date(Date.parse(time)).getFullYear();
     monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
     dayValue.value = new Date(Date.parse(time)).getDate();
    });
    
    expensesBtn.addEventListener('click',function() {
      let sum = 0;

      for(let i = 0; i < expensesItem.length; i++) {
        let a = expensesItem[i].value,
        b =  expensesItem[++i].value;
    
    if ((typeof(a))=== 'string' && (typeof(a)) != null && (typeof(b)) != null 
        && a != '' && b != '' && a.length < 50 ) {
            console.log("done");
            appData.expenses[a] = b;
            sum += +b;
        
    } else {
        i = i - 1;
    }
  }  
  expensesValue.textContent = sum;

    });

    optionalExpensesBtn.addEventListener('click', function() {
      for (let i = 0; i <optionalExpensesItem.length ; i++) {
        let opt = optionalExpensesItem[i].value;
        appData.optionalExpenses[i]= opt;
        optionalexpensesValue.textContent += appData.optionalExpenses[i] + ' , ';
        
      }
    });

  countBtn.addEventListener('click', function() {
    
    if(appData.budget != undefined) {
      appData.moneyPerDay = (appData.budget / 30).toFixed();
    daybudgetValue.textContent = appData.moneyPerDay;
    
    if (appData.moneyPerDay < 100){
      levelValue.textContent ='минимальный уровень достатка';
    } else if(appData.moneyPerDay >= 100 && appData.moneyPerDay < 2000) {
      levelValue.textContent = 'средний уровень достатка';
    } else if (appData.moneyPerDay >= 2000){
      levelValue.textContent ='высокий уровень достатка';
    } else {
      levelValue.textContent ='невозможно вычислить уровень достатка';
    }
  } else {
    daybudgetValue.textContent = 'Произошла ошибка';
  }
  });

  income.addEventListener('input', function(){
   let items = income.value;
   appData.income = items.split(', ');
   incomeValue.textContent = appData.income;

  });

  haveSavings.addEventListener('click', function() {
    if (appData.savings == true) {
      appData.savings = false;
    } else {
      appData.savings = true;
    }
  });

  sumValue.addEventListener('input', function() {
    if (appData.savings == true) {
      let sum = +sumValue.value,
          percent = +percentValue.value;
          appData.monthIncome = sum/100/12*percent;
          appData.yearIncome = sum/100*percent;

          monthsavingsValue.textContent = appData.monthIncome.toFixed(1);
          yearsavingsValue.textContent = appData.monthIncome.toFixed(1);
    }
  });

  percentValue.addEventListener('input', function() {
    if (appData.savings == true) {
      let sum = +sumValue.value,
      percent = +percentValue.value;
      appData.monthIncome = sum/100/12*percent;
      appData.yearIncome = sum/100*percent;

      monthsavingsValue.textContent = appData.monthIncome.toFixed(1);
      yearsavingsValue.textContent = appData.monthIncome.toFixed(1);

    }
  });
    
    let appData = {
      budget: money,
      timeData: time,
      expenses: {},
      income: [],
      savings: false,
      optionalExpenses : {}
    };
      