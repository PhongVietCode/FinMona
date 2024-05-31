import { useRoute } from "@react-navigation/native"
import { EditTransaction } from "./EditTransaction"
import { Transaction } from "@/Components/TransactionItem/TransactionItem"

export const EditTransactionContainer = () => {
    const rout = useRoute()
    const record = rout.params as Transaction
    return <EditTransaction record={record}/>
}