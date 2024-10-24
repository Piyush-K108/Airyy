import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
// import axios from 'axios';

import {GestureHandlerRootView} from 'react-native-gesture-handler';

const AgreementPage = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.content}>
          <Text style={styles.agreementText2}>
            Agreement With Renters Agreement between AiRYY Rides And You. This
            agreement is made and executed between AiRYY Rides, located at 160/4
            Bholaram Ustad Marg, Bhanwar Kuwa, Indore (M.P.), and the owner of
            the bike for rental purposes, referred to as the Owner, whose
            address is provided during registration. Expression Company means
            AiRYY Rides (First Party) and Owner means the person providing the
            bike for rental (Second Party).
          </Text>
          <Text style={styles.agreementText}>
            {'\n'}1. Bike Condition and Maintenance:
            {'\n\n'}1.1. The Owner agrees to provide the bike in good working
            condition and properly serviced to AiRYY Rides for rental purposes.
            {'\n\n'}1.2. The Owner will ensure that the bike is regularly
            maintained and serviced to ensure safe and reliable operation.
            {'\n\n'}2. Defects and Repairs:
            {'\n\n'}2.1. The Owner represents that the bike is free from any
            defects at the time of transfer to AiRYY Rides.
            {'\n\n'}2.2. In the event a defect is discovered after rental, the
            Owner shall not hold AiRYY Rides responsible for any repairs or
            associated costs.
            {'\n\n'}3. Damages and Theft:
            {'\n\n'}3.1. AiRYY Rides shall not be held responsible for any
            damages sustained to the bike during the rental period, including
            damages caused by customers or third parties.
            {'\n\n'}3.2. In the unfortunate event of theft, the Owner
            acknowledges that AiRYY Rides is not liable for the replacement or
            compensation of the stolen bike.
            {'\n\n'}4. Documentation:
            {'\n\n'}4.1. The Owner agrees to provide all necessary and
            up-to-date documentation for the bike, including but not limited to
            registration, insurance, and ownership proofs.
            {'\n\n'}4.2. AiRYY Rides reserves the right to inspect and verify
            the provided documents at any time during the rental period.
            {'\n\n'}5. Rental Terms:
            {'\n\n'}5.1. The duration and terms of each rental shall be
            determined by AiRYY Rides and communicated to the Owner prior to
            renting out the bike.
            {'\n\n'}5.2. The Owner shall receive a portion of the rental fees
            collected by AiRYY Rides, as agreed upon by both parties.
            {'\n\n'}6. Indemnification:
            {'\n\n'}6.1. The Owner agrees to indemnify and hold AiRYY Rides
            harmless against any claims, liabilities, costs, and expenses
            arising from the use of the rented bike.
            {'\n\n'}6.2. The Owner agrees to provide adequate insurance coverage
            for the bike during the rental period.
            {'\n\n'}7. Termination:
            {'\n\n'}7.1. Either party may terminate this Agreement with prior
            written notice.
            {'\n\n'}7.2. Upon termination, the Owner shall retrieve the bike
            from AiRYY Rides' possession within a reasonable timeframe.
            {'\n\n'}8. Governing Law:
            {'\n\n'}8.1. This Agreement shall be governed by and construed in
            accordance with the laws of the jurisdiction where AiRYY Rides
            operates.
            {'\n\n'}9. Miscellaneous:
            {'\n\n'}9.1. This Agreement constitutes the entire understanding
            between the parties and supersedes any prior agreements or
            understandings.
            {'\n\n'}9.2. Any amendments to this Agreement must be made in
            writing and signed by both parties. By signing below, the parties
            acknowledge their understanding and agreement to the terms and
            conditions outlined in this Agreement.
            {'\n\n'}
            [Signatures]
          </Text>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#feb101',
    // backgroundColor: '#000',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
  },
  content: {
    backgroundColor: '#FFF',
    // borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    marginBottom: 26,
    lineHeight: 35,

    elevation: 8,
    overflow: 'scroll', // Enable scrolling if content overflows
  },
  agreementText: {
    color: '#000',
    fontSize: 14, // Adjust the font size as needed
    lineHeight: 20,
    fontWeight: '700', // Adjust the line height as needed
  },
  agreementText2: {
    color: '#000',
    fontSize: 14, // Adjust the font size as needed
    lineHeight: 20,
    fontWeight: '700', // Adjust the line height as needed
    textAlign: 'justify',
  },
  bottomContainer: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 18,
  },
  nextButton: {
    backgroundColor: '#feb101',
    borderRadius: 2,
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  nextButtonText: {
    color: '#000',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  disabledButtonText: {
    color: 'gray',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkmark: {
    color: '#000',
  },
});

export default AgreementPage;
