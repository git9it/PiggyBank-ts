import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Layout from "../../../components/Layout";
import piggyBankFactoryWithSinger from "../../../contracts/piggy_banks_factory/piggyBankFactoryWithSinger";
import { parseEther } from "ethers/lib/utils";
// выбор даты --> https://reactdatepicker.com/#example-specific-date-range
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const NewPiggyBankPage = () => {
  const router = useRouter();
  const ownerRef = useRef();
  const descRef = useRef();

  // добавил amountRef, piggyBankType, dateEnd
  const amountRef = useRef();
  const [piggyBankType, setPiggyBankType] = useState("amount");
  // выбор даты
  const [startDate, setStartDate] = useState(new Date());
  const [error, setError] = useState()

  const handleCreateSubmit = async (event) => {
    event.preventDefault();
    // просматриваем ошибку, если адрес не указан 
    if((ownerRef.current.value == "") ){
      setError("No wallet input")
    }
    // по нажатию на кнопку выбираем функцию в зависимости от select
    else{
        if (piggyBankType === "endTime") {
          const dateEnd = Date.parse(startDate);
          // чекаю время 
          if(dateEnd - Date.now() < 0){
            setError("Incorrect end date")
          }
          else{
            try {
              const tx = await piggyBankFactoryWithSinger().createTimePiggyBank(
                ownerRef.current.value,
                descRef.current.value,
                dateEnd
              );
              console.log("tx: ", tx);
              const response = await tx.wait();
              console.log("response: ", response);
              setError("Transaction success")
              setTimeout(() => { 
                router.push({
                pathname: "/piggy_banks",
                query: { user: ownerRef.current.value },
              }); }, 5000);
          } catch (error) {
            setError("Wallet doesnt exist or user rejected transaction")
            console.error(error);
          }
        }
      } else {
        if(isNaN(amountRef.current.value) || (amountRef.current.value == "" ) || (amountRef.current.value == 0)){
          setError("Incorrect Amount")
        }
        else{
          console.log("Amount on wei", parseEther(amountRef.current.value));
          try {
            const tx = await piggyBankFactoryWithSinger().createAmmountPiggyBank(
              ownerRef.current.value,
              descRef.current.value,
              parseEther(amountRef.current.value)
            );
            console.log("tx: ", tx);
            const response = await tx.wait();
            console.log("response: ", response);
            setError("Transaction success")
            setTimeout(() => { 
              router.push({
              pathname: "/piggy_banks",
              query: { user: ownerRef.current.value },
            }); }, 5000);
          } catch (error) {
            // как читать ошибку хз 
            setError("Wallet doesnt exist or user rejected transaction")
            console.error(error);
          }
        }
      }
    }
    console.log(error)
  }


  console.log("Change PiggyBank Type:", piggyBankType);
  console.log("Date End:", Date.parse(startDate) / 1000);

  return (
    <Layout>
      <h1 className="text-4xl">Create you piggy bank!</h1>
      <form className="my-4" onSubmit={handleCreateSubmit}>
        <label className="text-2xl" htmlFor="owner">
          Enter owner address:
        </label>
        <br />
        <input
          className="my-2 w-1/2 rounded border border-orange-300 py-1 px-4 text-xl "
          ref={ownerRef}
          name="owner"
          type="text"
          placeholder="enter owner address"
        />
        <br />
        <label className="text-2xl" htmlFor="desc">
          Enter description:
        </label>
        <br />
        <textarea
          className="my-2 w-1/2 rounded border border-orange-300 py-1 px-4 text-xl "
          ref={descRef}
          name="desc"
          type="text"
          placeholder="enter description"
        />
        <br />


        {/* добавил Select для изменения типа создаваемой копилки */}
        <div>
          <label htmlFor="countries" className="text-2xl">
            Select a type Piggy Bank
          </label>
          <select
            value={piggyBankType}
            onChange={(e) => setPiggyBankType(e.target.value)}
            id="countries"
            className="my-2 block w-1/2 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          >
            <option value="amount">Amount Piggy Bank</option>
            <option value="endTime">Time Piggy Bank</option>
          </select>
        </div>

        <br />

        {/* 
            юзер френдли выбор даты и времени копилки 
            добавил поле для ввода суммы в ETH
            отображение в зависимости от выбора select
        */}

        {piggyBankType === "amount" ? (
          <div>
            <label className="text-2xl" htmlFor="amount">
              Enter amount for Piggy (eth):
            </label>
            <br />
            <input
              className="my-2 w-1/2 rounded border border-orange-300 py-1 px-4 text-xl "
              ref={amountRef}
              name="amount"
              type="text"
              placeholder="enter amount on ETH"
            />
          </div>
        ) : (
          <div>
            <label className="text-2xl" htmlFor="date">
              Enter end date in uts:
            </label>
            <br />
            <div className="mt-4 w-1/2 p-2 rounded border border-orange-300">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="MMMM d, yyyy h:mm aa"
              />
            </div>
          </div>
        )}

        <br />
        <button
          className="my-2 w-1/4 rounded border border-orange-300 py-1 px-4 text-xl hover:bg-orange-300"
          type="submit"
        >
          Create
        </button>
      </form>
      {error ? <div className={error=="Transaction success" ? "bg-green-600 w-28 text-white" : "bg-red-600 w-28 text-white"}>{error}</div> : null}
    </Layout>
  );
};

export default NewPiggyBankPage;