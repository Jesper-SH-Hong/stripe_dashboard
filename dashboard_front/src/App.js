import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Tab,
} from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import TableEntity from "./component/tableEntity";



function App() {
  const baseURL = "http://localhost:4242/webhook";

  const [data, setData] = React.useState(null);
  const [isDataLoaded, setIsDataLoaded] = React.useState(false);

  async function fetchData() {
    await axios.get(baseURL).then((response) => {
      // console.log("response: ", response);
      setData(response.data);
      setIsDataLoaded(true);
    });
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  if (!isDataLoaded) return null;

  // console.log(data);

  return (
    <ChakraProvider>
      <div className="App">
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <TableCaption>Hauler Stripe Revenue Report</TableCaption>
            <Thead>
              <Tr>
                <Th>Type</Th>
                <Th isNumeric>Amount</Th>
                <Th>Created</Th>
                <Th isNumeric>fee</Th>
                <Th isNumeric>net</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.data.map((balanceTx) => (
                <TableEntity key={balanceTx.id} balanceTxObject={balanceTx} />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </ChakraProvider>
  );
}

export default App;
