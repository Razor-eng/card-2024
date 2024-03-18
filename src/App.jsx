import { useEffect, useRef, useState } from 'react';
import './card.css'
import './style.css'
import useLongPress from './useLongPress';

function App() {
  const years = ["2020", "2021", "2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030"];
  const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

  const [card1, setCard1] = useState('####')
  const [card2, setCard2] = useState('####')
  const [card3, setCard3] = useState('####')
  const [card4, setCard4] = useState('####')
  const [cardName, setCardName] = useState('full name')
  const [cardMonth, setCardMonth] = useState('mm');
  const [cardYear, setCcardYear] = useState('yy');
  const [cardCvv, setCardCvv] = useState('cvv');
  const [data, setData] = useState(JSON.parse(localStorage.getItem('cardDetails')));
  const [mouse, setMouse] = useState(false);
  const [submitVal, setSubmitVal] = useState(false);
  const [incorrect, setIncorrect] = useState(false);

  useEffect(() => {
    let data = localStorage.getItem('cardDetails');
    if (data) {
      setSubmitVal(true);
    }
  }, [])

  const submit = (e) => {
    e.preventDefault();
    if (card1.includes("#") || card1.length < 4 || isNaN(card2) || card2.length < 4 || isNaN(card3) || card3.length < 4 || isNaN(card4) || card4.length < 4 || cardName === "" || isNaN(cardMonth) || isNaN(cardYear) || isNaN(cardCvv) || cardCvv.length < 3) {
      setIncorrect(true);
    } else {
      setIncorrect(false);
      setSubmitVal(true);
      localStorage.setItem('cardDetails',
        JSON.stringify({
          cardNo: {
            card1: card1,
            card2: card2,
            card3: card3,
            card4: card4
          },
          cardName: cardName,
          cardMonth: cardMonth,
          cardYear: cardYear,
          cardCvv: cardCvv,
        })
      )
      setData(JSON.parse(localStorage.getItem('cardDetails')));
    }
  }

  const elementRef = useRef()
  useLongPress(elementRef, () => {
    if (confirm("Are you sure, you want to reset?")) {
      localStorage.removeItem('cardDetails')
      setSubmitVal(false);
    }
  })

  return (
    <div className="container">
      {!submitVal ? (
        <>
          <div className="card-container hidden md:block">
            <div className="front" id={`${mouse ? 'front1' : 'front2'}`}>
              <div className="image">
                <div className="chip">
                  <div className="chip-line"></div>
                  <div className="chip-line"></div>
                  <div className="chip-line"></div>
                  <div className="chip-line"></div>
                  <div className="chip-main"></div>
                </div>
                <svg className="wave" viewBox="0 3.71 26.959 38.787" width="26.959" height="38.787" fill="white">
                  <path
                    d="M19.709 3.719c.266.043.5.187.656.406 4.125 5.207 6.594 11.781 6.594 18.938 0 7.156-2.469 13.73-6.594 18.937-.195.336-.57.531-.957.492a.9946.9946 0 0 1-.851-.66c-.129-.367-.035-.777.246-1.051 3.855-4.867 6.156-11.023 6.156-17.718 0-6.696-2.301-12.852-6.156-17.719-.262-.317-.301-.762-.102-1.121.204-.36.602-.559 1.008-.504z">
                  </path>
                  <path
                    d="M13.74 7.563c.231.039.442.164.594.343 3.508 4.059 5.625 9.371 5.625 15.157 0 5.785-2.113 11.097-5.625 15.156-.363.422-1 .472-1.422.109-.422-.363-.472-1-.109-1.422 3.211-3.711 5.156-8.551 5.156-13.843 0-5.293-1.949-10.133-5.156-13.844-.27-.309-.324-.75-.141-1.114.188-.367.578-.582.985-.542h.093z">
                  </path>
                  <path
                    d="M7.584 11.438c.227.031.438.144.594.312 2.953 2.863 4.781 6.875 4.781 11.313 0 4.433-1.828 8.449-4.781 11.312-.398.387-1.035.383-1.422-.016-.387-.398-.383-1.035.016-1.421 2.582-2.504 4.187-5.993 4.187-9.875 0-3.883-1.605-7.372-4.187-9.875-.321-.282-.426-.739-.266-1.133.164-.395.559-.641.984-.617h.094zM1.178 15.531c.121.02.238.063.344.125 2.633 1.414 4.437 4.215 4.437 7.407 0 3.195-1.797 5.996-4.437 7.406-.492.258-1.102.07-1.36-.422-.257-.492-.07-1.102.422-1.359 2.012-1.075 3.375-3.176 3.375-5.625 0-2.446-1.371-4.551-3.375-5.625-.441-.204-.676-.692-.551-1.165.122-.468.567-.785 1.051-.742h.094z">
                  </path>
                </svg>
              </div>
              <div className="card-number-box">
                <div className="cardNumberFront">
                  <p className="card-part-1">{data?.cardNo.card1 && card1 === "####" ? data.cardNo.card1 : card1}</p>
                  <p className="card-part-2">{data?.cardNo.card2 && card2 === "####" ? data.cardNo.card2 : card2}</p>
                  <p className="card-part-3">{data?.cardNo.card3 && card3 === "####" ? data.cardNo.card3 : card3}</p>
                  <p className="card-part-4">{data?.cardNo.card4 && card4 === "####" ? data.cardNo.card4 : card4}</p>
                </div>
              </div>
              <div className="flexbox">
                <div className="box">
                  <span>card holder</span>
                  <div className="card-holder-name">
                    {data?.cardName && cardName === "full name" || cardName === "" ? data.cardName : cardName}
                  </div>
                </div>
                <div className="box">
                  <span>expires</span>
                  <div className="expiration">
                    <span className="exp-month">
                      {data?.cardMonth && cardMonth === "mm" ? data.cardMonth : cardMonth}
                    </span>
                    <span>/</span>
                    <span className="exp-year">
                      {data?.cardYear && cardYear === "yy" ? data.cardYear.slice(-2) : cardYear.slice(-2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="back" id={`${mouse ? 'back1' : 'back2'}`}>
              <div className="stripe"></div>
              <div className="box">
                <span>cvv</span>
                <div className="cvvTag">
                  <div className="cvv-empty"></div>
                  <div className="cvv-box">
                    {data?.cardCvv && cardCvv === "cvv" ? data.cardCvv : cardCvv}
                  </div>
                </div>
                <img src="/visa.png" alt="" />
              </div>
            </div>

          </div>

          <form action="">
            <div className="inputBox">
              <span>card number</span>
              <div className="cardNumber">
                <input type="text" maxLength="4" className="card-number-input1" onChange={e => setCard1(e.target.value)} placeholder={data?.cardNo.card1} />
                <input type="text" maxLength="4" className="card-number-input2" onChange={e => setCard2(e.target.value)} placeholder={data?.cardNo.card2} />
                <input type="text" maxLength="4" className="card-number-input3" onChange={e => setCard3(e.target.value)} placeholder={data?.cardNo.card3} />
                <input type="text" maxLength="4" className="card-number-input4" onChange={e => setCard4(e.target.value)} placeholder={data?.cardNo.card4} />
              </div>
            </div>
            <div className="inputBox">
              <span>card holder</span>
              <input type="text" className="card-holder-input" onChange={e => setCardName(e.target.value)} placeholder={data?.cardName} />
            </div>
            <div className="flexbox">
              <div className="date">
                <div className="inputBox">
                  <span>expiration mm</span>
                  <select defaultValue={data?.cardMonth ? data.cardMonth : "month"} className="month-input" onChange={e => setCardMonth(e.target.value)}>
                    <option value="month" disabled>month</option>
                    {months.map((month, index) => (
                      <option key={index} value={`${month}`}>{month}</option>
                    ))}
                  </select>
                </div>
                <div className="inputBox">
                  <span>expiration yy</span>
                  <select defaultValue={data?.cardYear ? data.cardYear : "year"} className="year-input" onChange={e => setCcardYear(e.target.value)}>
                    <option value="year" disabled>year</option>
                    {years.map((year, index) => (
                      <option key={index} value={`${year}`}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="inputBox" onMouseEnter={() => setMouse(true)} onMouseLeave={() => setMouse(false)}>
                <span>cvv</span>
                <input type="text" maxLength="4" className="cvv-input" onChange={e => setCardCvv(e.target.value)} placeholder={data?.cardCvv} />
              </div>
            </div>
            {incorrect &&
              <h1 className='text-red-500 text-sm mt-4'>Enter all the fields properly!</h1>
            }
            <input type="submit" value="submit" className="submit-btn" onClick={(e) => submit(e)} />
          </form >
        </>
      ) : (
        <div className="card-container" ref={elementRef}>
          <div className="front" id={`${mouse ? 'front1' : 'front2'}`} onClick={() => setMouse(true)}>
            <div className="image mt-10 sm:mt-5">
              <div className="chip">
                <div className="chip-line"></div>
                <div className="chip-line"></div>
                <div className="chip-line"></div>
                <div className="chip-line"></div>
                <div className="chip-main"></div>
              </div>
              <svg className="wave" viewBox="0 3.71 26.959 38.787" width="26.959" height="38.787" fill="white">
                <path
                  d="M19.709 3.719c.266.043.5.187.656.406 4.125 5.207 6.594 11.781 6.594 18.938 0 7.156-2.469 13.73-6.594 18.937-.195.336-.57.531-.957.492a.9946.9946 0 0 1-.851-.66c-.129-.367-.035-.777.246-1.051 3.855-4.867 6.156-11.023 6.156-17.718 0-6.696-2.301-12.852-6.156-17.719-.262-.317-.301-.762-.102-1.121.204-.36.602-.559 1.008-.504z">
                </path>
                <path
                  d="M13.74 7.563c.231.039.442.164.594.343 3.508 4.059 5.625 9.371 5.625 15.157 0 5.785-2.113 11.097-5.625 15.156-.363.422-1 .472-1.422.109-.422-.363-.472-1-.109-1.422 3.211-3.711 5.156-8.551 5.156-13.843 0-5.293-1.949-10.133-5.156-13.844-.27-.309-.324-.75-.141-1.114.188-.367.578-.582.985-.542h.093z">
                </path>
                <path
                  d="M7.584 11.438c.227.031.438.144.594.312 2.953 2.863 4.781 6.875 4.781 11.313 0 4.433-1.828 8.449-4.781 11.312-.398.387-1.035.383-1.422-.016-.387-.398-.383-1.035.016-1.421 2.582-2.504 4.187-5.993 4.187-9.875 0-3.883-1.605-7.372-4.187-9.875-.321-.282-.426-.739-.266-1.133.164-.395.559-.641.984-.617h.094zM1.178 15.531c.121.02.238.063.344.125 2.633 1.414 4.437 4.215 4.437 7.407 0 3.195-1.797 5.996-4.437 7.406-.492.258-1.102.07-1.36-.422-.257-.492-.07-1.102.422-1.359 2.012-1.075 3.375-3.176 3.375-5.625 0-2.446-1.371-4.551-3.375-5.625-.441-.204-.676-.692-.551-1.165.122-.468.567-.785 1.051-.742h.094z">
                </path>
              </svg>
            </div>
            <div className="card-number-box">
              {data.cardNo.card1 + " " + data.cardNo.card2 + " " + data.cardNo.card3 + " " + data.cardNo.card4}
            </div>
            <div className="flexbox">
              <div className="box">
                <span>card holder</span>
                <div className="card-holder-name">{data.cardName}</div>
              </div>
              <div className="box">
                <span>expires</span>
                <div className="expiration">
                  <span className="exp-month">{data.cardMonth}</span>
                  <span>/</span>
                  <span className="exp-year">{data.cardYear.slice(-2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="back" id={`${mouse ? 'back1' : 'back2'}`} onClick={() => setMouse(false)}>
            <div className="stripe"></div>
            <div className="box">
              <span>cvv</span>
              <div className="cvvTag">
                <div className="cvv-empty"></div>
                <div className="cvv-box">{data.cardCvv}</div>
              </div>
              <img src="/visa.png" alt="" />
            </div>
          </div>
        </div>
      )
      }
    </div >
  )
}

export default App
