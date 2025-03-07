import React from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteSection,
} from "@heroui/autocomplete";
import { Alert } from "@heroui/alert";
import { Form } from "@heroui/form";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";

import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import rekeningData from "@/data/list.json";

export default function IndexPage() {
  const baseAPIurl =
    "https://cekrekening-api.belibayar.online/api/v1/account-inquiry";

  const [bankName, setBankName] = React.useState<any>("");
  const [isVisible, setIsVisible] = React.useState(false);
  const [accountHolder, setAccountHolder] = React.useState<string | null>("");
  const [btnLoading, setBtnLoading] = React.useState(false);
  const [accountHolderFound, setAccountHolderFound] = React.useState<any>("");
  const onSelectionBank = (key: React.Key | null) => {
    setBankName(key);
  };
  const { onOpenChange } = useDisclosure();

  const onSubmit = (e: any) => {
    e.preventDefault();
    let data: any = Object.fromEntries(new FormData(e.currentTarget));

    getDataAccount(bankName, data.account_number);
  };

  function getDataAccount(banks: string | null, accounts: string | null) {
    setIsVisible(false);
    setBtnLoading(true);

    fetch(baseAPIurl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        account_bank: banks,
        account_number: accounts,
      }),
    })
      .then(async (response) => {
        const data = await response.json();

        if (response.ok) {
          setBtnLoading(false);
          setIsVisible(true);
          setAccountHolderFound("success");
          setAccountHolder(data.data.account_holder);
        } else {
          setBtnLoading(false);
          setIsVisible(true);
          setAccountHolderFound("warning");
          setAccountHolder(data.message);
        }
      })
      .catch(() => {
        setBtnLoading(false);
        setIsVisible(true);
        setAccountHolderFound("danger");
        setAccountHolder("There is an error, please try again later");
      });
  }

  return (
    <DefaultLayout>
      <Modal
        defaultOpen={true}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        placement={"auto"}
        size={"lg"}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Important Information!
              </ModalHeader>
              <ModalBody>
                <p className="text-sm text-default-600 text-justify">
                  This API for checking bank/e-wallet account holder names in
                  Indonesia, cannot be used on servers/IPs located outside of
                  Indonesia.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center items-center">
          <span className={title()}>Cek Nama Rekening </span>
          <br />
          <span className={title({ color: "violet", size: "sm" })}>
            Bank/e-Wallet Indonesia&nbsp;
          </span>
        </div>

        <Form
          className="w-full gap-6 mt-8 justify-center items-center"
          onSubmit={onSubmit}
        >
          <Autocomplete
            isRequired
            className="max-w-4xl"
            errorMessage="Bank/e-Wallet Name is required"
            label={"Bank/e-Wallet Name"}
            scrollShadowProps={{
              isEnabled: true,
            }}
            size={"sm"}
            variant="bordered"
            onSelectionChange={onSelectionBank}
          >
            <AutocompleteSection title="Bank Name">
              {rekeningData.banks.map((bank) => (
                <AutocompleteItem key={bank.key}>{bank.label}</AutocompleteItem>
              ))}
            </AutocompleteSection>
            <AutocompleteSection title="e-Wallet Name">
              {rekeningData.ewallets.map((ewallet) => (
                <AutocompleteItem key={ewallet.key}>
                  {ewallet.label}
                </AutocompleteItem>
              ))}
            </AutocompleteSection>
          </Autocomplete>

          <Input
            isClearable
            isRequired
            className="max-w-4xl"
            errorMessage="Account Number is required"
            label="Account Number"
            name="account_number"
            size={"sm"}
            type="number"
            variant="bordered"
          />
          <Alert
            className="max-w-4xl"
            color={accountHolderFound}
            isVisible={isVisible}
            title={accountHolder}
            variant="faded"
            onClose={() => setIsVisible(false)}
          />
          <Button
            color="secondary"
            isLoading={btnLoading}
            type="submit"
            variant={"shadow"}
          >
            Check Account
          </Button>
        </Form>
      </section>
    </DefaultLayout>
  );
}
