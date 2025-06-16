import {
  AppBar,
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useEnvironment } from "./hooks/useEnvironment";
import { useWallet } from "./hooks/useWallet";
import { useWemix } from "./hooks/useWemix";
import { useMessage } from "./hooks/useMessage";

function App() {
  const {
    environment,
    chainId,
    chainName,
    setChainName,
    handleChangeEnvironment,
  } = useEnvironment();
  const { wallets, handleCheckBox, getSupportedWallets } = useWallet();
  const {
    wemixInstance,
    result,
    initialize,
    connect,
    forcedConnect,
    disconnect,
    signMessage,
    personalSignMessage,
    signTransaction,
    playSignMessage,
    playSignTransaction,
  } = useWemix(environment, getSupportedWallets());
  const {
    message,
    setMessage,
    transaction,
    setTransaction,
    personSignMessage,
    setPersonalSignMessage,
    playMessage,
    setPlayMessage,
    playTransaction,
    setPlayTransaction,
  } = useMessage();

  const [currentTheme, setCurrentTheme] = useState(
    localStorage.getItem("WEMIXSDK_THEME") || "light"
  );
  const [currentLanguage, setCurrentLanguage] = useState("");

  useEffect(() => {
    if (!wemixInstance) return;
    setCurrentLanguage(localStorage.getItem("WEMIXSDK_LANG") || "en");
  }, [wemixInstance]);

  return (
    <Box
      style={{
        width: "100%",
      }}
    >
      <AppBar>
        <Toolbar
          sx={{
            maxWidth: 1200,
            m: "0 auto",
            width: "100%",
            p: "0 24px",
            display: "flex",
            justifyContent: "space-between",
            boxSizing: "border-box",
          }}
        >
          <Typography variant="h5">JS SDK SAMPLE</Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ my: 10 }}>
        {/* 초기화 */}
        <Box>
          <Stack>
            <FormControl component="fieldset" variant="standard">
              <FormLabel component="legend">Wallets to Enable</FormLabel>
              <FormGroup sx={{ flexDirection: "row" }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={wallets.wemixplayapp}
                      onChange={handleCheckBox}
                      name="wemixplayapp"
                    />
                  }
                  label="WEMIX PLAY app"
                />
              </FormGroup>
            </FormControl>
          </Stack>
          <Stack>
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">
                Environment
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={environment}
                onChange={handleChangeEnvironment}
                sx={{ flexDirection: "row" }}
              >
                <FormControlLabel
                  value="stage"
                  control={<Radio />}
                  label="Stage"
                />
              </RadioGroup>
            </FormControl>
          </Stack>
          <Button
            sx={{ mt: 2 }}
            variant="contained"
            color="primary"
            onClick={(e) => {
              e.preventDefault();
              initialize();
            }}
            disabled={window.Wemix.isInitialized}
          >
            Initialize
          </Button>
          <Typography mt={1}>
            isInitialized: {window.Wemix.isInitialized ? "true" : "false"}
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* 연결 */}
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <TextField
            id="chainId"
            label="chainId"
            variant="outlined"
            value={chainId}
            type="number"
            disabled
            sx={{
              width: 150,
              "& .MuiInputBase-root.Mui-disabled": {
                "& .MuiInputBase-root.Mui-disabled": {
                  backgroundColor: "rgba(0, 0, 0, 0.12)",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(0, 0, 0, 0.23)",
                  },
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "rgba(0, 0, 0, 0.38)",
                  },
                },
              },
            }}
          />
        </Box>
        <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              e.preventDefault();
              connect(chainId);
            }}
          >
            Connect
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={(e) => {
              e.preventDefault();
              disconnect();
            }}
          >
            Disconnect
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              e.preventDefault();
              forcedConnect(chainId);
            }}
          >
            Forced Connect
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography>[Wallet Connection Status]</Typography>
        <Typography mt={1}>
          isConnected: {wemixInstance?.isConnected ? "true" : "false"}
        </Typography>
        <Typography>
          connectedWallet: {wemixInstance?.connectedWallet}
        </Typography>
        <Typography>address: {wemixInstance?.address}</Typography>
        <Typography>chainId: {wemixInstance?.chainId}</Typography>

        <Divider sx={{ my: 3 }} />

        {/* 메시지 서명 */}
        <Box>
          <TextField
            id="message"
            label="message to sign"
            variant="outlined"
            fullWidth
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <Button
            sx={{ mt: 1 }}
            variant="contained"
            color="primary"
            onClick={(e) => {
              e.preventDefault();
              signMessage(message);
            }}
          >
            sign message
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* personal_sign 메시지 서명 */}
        <Box>
          <TextField
            id="personal-sign-message"
            label="personal sign message"
            variant="outlined"
            fullWidth
            value={personSignMessage}
            onChange={(e) => {
              setPersonalSignMessage(e.target.value);
            }}
          />
          <Button
            sx={{ mt: 1 }}
            variant="contained"
            color="primary"
            onClick={(e) => {
              e.preventDefault();
              personalSignMessage(personSignMessage);
            }}
          >
            personal sign message
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* 트랜잭션 서명 */}
        <Box>
          <TextField
            id="transaction"
            label="transaction to sign"
            variant="outlined"
            fullWidth
            multiline
            rows={10}
            value={transaction}
            onChange={(e) => {
              setTransaction(e.target.value);
            }}
          />
          <Button
            sx={{ mt: 1 }}
            variant="contained"
            color="primary"
            onClick={(e) => {
              e.preventDefault();
              signTransaction(transaction);
            }}
          >
            sign Transaction
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Wemix Play App Sign Message (play_eth_sign) */}
        <Box>
          <TextField
            id="play-sign-message"
            label="message to sign for wemix play app"
            variant="outlined"
            fullWidth
            multiline
            rows={10}
            value={playMessage}
            onChange={(e) => {
              setPlayMessage(e.target.value as string);
            }}
          />
          <Button
            sx={{ mt: 1 }}
            variant="contained"
            color="primary"
            onClick={(e) => {
              e.preventDefault();
              playSignMessage(playMessage);
            }}
          >
            play sign message
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Wemix Play App Sign Transaction (play_eth_sign) */}
        <Box>
          <TextField
            id="chainName"
            label="chainName"
            variant="outlined"
            value={chainName}
            type="string"
            onChange={(e) => {
              setChainName(e.target.value as string);
            }}
            sx={{ width: 150, mb: 1 }}
          />
          <TextField
            id="play-sign-transaction"
            label="transaction to sign for wemix play app"
            variant="outlined"
            fullWidth
            multiline
            rows={10}
            value={playTransaction}
            onChange={(e) => {
              setPlayTransaction(e.target.value as string);
            }}
          />
          <Button
            sx={{ mt: 1 }}
            variant="contained"
            color="primary"
            onClick={(e) => {
              e.preventDefault();
              playSignTransaction(playTransaction, chainName);
            }}
          >
            play sign transaction
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* 응답 확인 */}
        <Box sx={{ overflowWrap: "break-word" }}>
          <Typography variant="h6">Result</Typography>
          <Typography
            paragraph
            style={{
              overflowWrap: "break-word",
              wordWrap: "break-word",
              whiteSpace: "pre-wrap",
              wordBreak: "break-all",
            }}
          >
            {result}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default App;
