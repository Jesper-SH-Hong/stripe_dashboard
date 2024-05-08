import {
  Tr,
  Td,
} from "@chakra-ui/react";

  function epochToHumanReadable(epoch) {
    const date = new Date(epoch * 1000);
    return date.toLocaleString();
  }

export default function TableEntity(props) {

const { id, type, amount, created, fee, net } = props.balanceTxObject;

  return (
    <Tr key={id}>
      <td>{type}</td>
      <Td isNumeric>{amount}</Td>
      <Td>{epochToHumanReadable(created)}</Td>
      <Td isNumeric>{fee}</Td>
      <Td isNumeric>{net}</Td>
    </Tr>
  )
}
