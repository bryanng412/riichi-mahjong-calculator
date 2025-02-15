import { ColorModeButton } from '@/components/ui/color-mode'
import {
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Switch } from '@/components/ui/switch'
import { useBoundStore } from '@/store/boundStore'
import { OptionsNames } from '@/store/optionsSlice'
import { IconButton, Text, VStack } from '@chakra-ui/react'
import { FaGear } from 'react-icons/fa6'
import { InfoTip } from './ui/toggle-tip'

const Options = () => {
  const {
    showHanScoring,
    showJapaneseYakuNames,
    showNumberOfTilesInHand,
    showTileHelpers,
    setOptionsValue,
  } = useBoundStore()

  const getOptionsOnChange =
    (
      option: OptionsNames
    ): React.ComponentProps<typeof Switch>['onCheckedChange'] =>
    e =>
      setOptionsValue(option, e.checked)

  return (
    <DialogRoot placement="center">
      <DialogBackdrop />
      <DialogTrigger asChild>
        <IconButton
          aria-label="Options"
          variant="surface"
          _active={{
            transform: 'scale(0.98)',
          }}
        >
          <FaGear />
        </IconButton>
      </DialogTrigger>
      <DialogContent>
        <DialogCloseTrigger />
        <DialogHeader padding={6} paddingBottom={0} textAlign="center">
          <DialogTitle>
            <Text>Settings</Text>
          </DialogTitle>
        </DialogHeader>
        <DialogBody padding={6}>
          <VStack justifyContent="center" alignItems="center">
            <ColorModeButton />
            <Switch
              checked={showHanScoring}
              onCheckedChange={getOptionsOnChange('showHanScoring')}
            >
              Use Han Scoring
              <InfoTip
                content={
                  <Text>A simplified scoring system that only uses han</Text>
                }
              />
            </Switch>
            <Switch
              checked={showJapaneseYakuNames}
              onCheckedChange={getOptionsOnChange('showJapaneseYakuNames')}
            >
              Use Japanese Yaku names
            </Switch>
            <Switch
              checked={showNumberOfTilesInHand}
              onCheckedChange={getOptionsOnChange('showNumberOfTilesInHand')}
            >
              Show number of tiles in hand
            </Switch>
            <Switch
              checked={showTileHelpers}
              onCheckedChange={getOptionsOnChange('showTileHelpers')}
            >
              Show tile helpers
            </Switch>
          </VStack>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  )
}

export default Options
