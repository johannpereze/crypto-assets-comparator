import { WalletInfo } from "@/interfaces/comparator";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { ERC20_ABI } from "../utils/abi";
import { tokenData } from "../utils/constants";

export default function useGetWalletInfoService() {
  const [walletInfo, setWalletInfo] = useState<WalletInfo[]>([]);

  /* Type Guard */
  const tokenAddresses: string[] = tokenData
    .filter(
      (
        token
      ): token is {
        name: string;
        symbol: string;
        address: string;
        id: string;
      } => token.address !== null && token.address !== undefined
    )
    .map((token) => token.address);

  const getWalletInfo = async (walletAddress: string) => {
    if (!window.ethereum) {
      console.error("MetaMask is not installed");
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    // Get ETH balance
    const ethBalance = await provider.getBalance(walletAddress);
    const ethInfo = {
      name: "Ethereum",
      balance: ethers.formatUnits(ethBalance, 18),
      symbol: "ETH",
      id: "ethereum",
    };

    // Get token balances
    const walletInfoPromises = tokenAddresses.map(async (tokenAddress) => {
      const tokenContract = new ethers.Contract(
        tokenAddress,
        ERC20_ABI,
        signer
      );
      const name = await tokenContract.name();
      const balance = await tokenContract.balanceOf(walletAddress);
      const decimals = await tokenContract.decimals();
      return {
        name,
        balance: ethers.formatUnits(balance, decimals),
        symbol: await tokenContract.symbol(),
        decimals,
        id: tokenData.find((token) => token.address === tokenAddress)?.id || "",
      };
    });
    try {
      const tokenInfo = await Promise.all(walletInfoPromises);
      setWalletInfo([ethInfo, ...tokenInfo]);
    } catch (error) {
      console.error("Error fetching balance: ", error);
    }
  };

  useEffect(() => {
    const fetchWalletInfo = async () => {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const walletAddress = accounts[0];
      await getWalletInfo(walletAddress);
    };

    fetchWalletInfo();
  }, []);

  return { walletInfo };
}
