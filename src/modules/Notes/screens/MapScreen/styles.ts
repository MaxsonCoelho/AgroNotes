import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  button: {
    position: 'absolute',
    bottom: 30,
    backgroundColor: '#2E7D32',
    padding: 16,
    borderRadius: 50,
    elevation: 6,
  },
  addButton: { right: 30 },
  syncButton: { right: 100 },
  pin: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  syncingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  syncingText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 8,
  },
});